from django.shortcuts import render

# Create your views here.
def info(request):
    return render(request,'info.html')

def contact(request):
    return render(request, 'contact.html')

def project(request):
    return render(request, 'project.html')