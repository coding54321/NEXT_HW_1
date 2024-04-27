from django.http import HttpResponseForbidden
from django.utils import timezone
from functools import wraps
from .models import Post

def update_last_viewed_info(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        response = view_func(request, *args, **kwargs)
        if response.status_code == 200:
            post_id = kwargs.get('post_id')
            post = Post.objects.filter(pk=post_id).first()
            if post and request.user.is_authenticated:
                post.last_viewed_at = timezone.now()
                post.last_viewed_by = request.user
                post.save()
        return response
    return _wrapped_view