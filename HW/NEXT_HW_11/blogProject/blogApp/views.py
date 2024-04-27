from django.shortcuts import render, get_object_or_404, redirect
from .forms import CustomUserCreationForm
from .decorators import update_last_viewed_info
from .models import Post
from django.contrib.auth.decorators import login_required
from django import forms
from .forms import PostForm

@login_required
@update_last_viewed_info
def post_detail(request, post_id):
    post = get_object_or_404(Post, pk=post_id)
    return render(request, 'post_detail.html', {'post': post})

def signup(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('post_list') 
    else:
        form = CustomUserCreationForm()
    return render(request, 'signup.html', {'form': form})



from django.http import HttpResponseForbidden
from .models import Comment

@login_required
def delete_comment(request, comment_id):
    comment = get_object_or_404(Comment, pk=comment_id)
    if request.user == comment.author or request.user.is_superuser:
        comment.delete()
        return redirect('post_detail', post_id=comment.post.pk)
    else:
        return HttpResponseForbidden()

from .forms import CommentForm

@login_required
def add_comment_to_post(request, post_id):
    post = get_object_or_404(Post, pk=post_id)
    if request.method == "POST":
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.author = request.user
            comment.post = post
            comment.save()
            return redirect('post_detail', post_id=post.id)
    else:
        form = CommentForm()
    return render(request, 'add_comment_to_post.html', {'form': form})

from django.utils import timezone
from .models import Post, Comment
from .forms import CommentForm, CustomUserCreationForm

def post_list(request):
    posts = Post.objects.all()
    return render(request, 'post_list.html', {'posts': posts})

@login_required
def post_new(request):
    if request.method == "POST":
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.save()
            return redirect('post_detail', post_id=post.pk)
    else:
        form = PostForm()
    return render(request, 'post_edit.html', {'form': form})

@login_required
@update_last_viewed_info
def post_detail(request, post_id):
    post = get_object_or_404(Post, pk=post_id)
    comments = post.comments.all()
    return render(request, 'post_detail.html', {
        'post': post,
        'comments': comments,
        'last_viewed_at': post.last_viewed_at,
        'last_viewed_by': post.last_viewed_by,
    })

@login_required
def post_delete(request, post_id):
    post = get_object_or_404(Post, pk=post_id, author=request.user)
    if post.author != request.user:
        return HttpResponseForbidden()
    post.delete()
    return redirect('post_list')

from django.contrib.auth.views import LogoutView
from django.urls import reverse_lazy


class CustomLogoutView(LogoutView):
    next_page = reverse_lazy('post_list')
