from django.shortcuts import render

# Create your views here.
def count(request):
    return render(request, 'count.html')

def result(request):
    text=request.POST['text']
    total_len=len(text)
    full_text=text
    without_text=len(text.replace(' ',''))
    word_count=len(text.split(' '))
    return render(request, 'result.html', {
        'total_len':total_len,
        'full_text':full_text,
        'without_text':without_text,
        'word_count':word_count,
        })