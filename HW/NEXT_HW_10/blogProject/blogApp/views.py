from django.shortcuts import render, redirect
from .models import Article, Comment, Recomment
from django.db.models import Count

# Create your views here.
def new(request):
    if request.method == 'POST':
        
        print(request.POST)
    
        new_article = Article.objects.create(
            title=request.POST['title'],
            content=request.POST['content'],
            category=request.POST['category'],  # 카테고리 처리 추가
        )
        return redirect('list')
    
    return render(request, 'new.html')


def list(request):
    # 카테고리별 글 개수를 계산
    articles = Article.objects.all()
    category_counts = Article.objects.values('category').annotate(total=Count('category'))
    
    # 카테고리별 글 개수를 딕셔너리로 변환하여, 카테고리 코드를 키로 사용
    category_count_dict = {item['category']: item['total'] for item in category_counts}

    return render(request, 'list.html', {
        'category_count_dict': category_count_dict, 'articles': articles,
    })
    
def detail(request, article_id):
    article = Article.objects.get(id=article_id)
    
    if request.method == 'POST':
        content = request.POST['content']
        # 대댓글 작성을 위한 parent_comment_id 값을 폼에서 받아옵니다.
        parent_comment_pk = request.POST.get('parent_comment_pk')

        if parent_comment_pk:
            # 대댓글 작성 로직
            parent_comment = Comment.objects.get(id=parent_comment_pk)
            Recomment.objects.create(comment=parent_comment, content=content)
        else:
            # 일반 댓글 작성 로직
            Comment.objects.create(article=article, content=content)
    
    return render(request, 'detail.html', {'article': article})

def category_list(request, category_name):
    # 카테고리 이름을 코드로 변환합니다. 이 예시에서는 카테고리 이름을 바로 사용합니다.
    # 실제 프로젝트에서는 카테고리 이름을 코드로 매핑하는 추가 로직이 필요할 수 있습니다.
    articles = Article.objects.filter(category=category_name.upper())
    return render(request, 'category_list.html', {'articles': articles, 'category_name': category_name})

def delete_comment(request, article_id, comment_pk):
    comment = Comment.objects.get(pk=comment_pk)
    comment.delete()
    return redirect('detail', article_id)