from django.shortcuts import render, redirect, get_object_or_404
from .models import Post

# Create your views here.
def home(request):
    posts= Post.objects.all()
    return render(request, 'home.html', {'posts':posts})

def new(request):
    categories = Post.category_choices
    if request.method == 'POST' :
        new_post = Post.objects.create(
            title = request.POST['title'],
            content = request.POST['content'],
            category = request.POST['category'],

        )
        return redirect('detail', new_post.pk)
    
    return render(request, 'new.html')

def detail(request, post_pk):
    post = Post.objects.get(pk=post_pk)
    
    return render(request, 'detail.html', {'post': post})

def category(request, category_id):
    posts = Post.objects.filter(category=category_id)
    return render(request, 'category.html', {'posts': posts})