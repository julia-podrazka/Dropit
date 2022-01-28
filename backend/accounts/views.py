from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.shortcuts import redirect
#from django.contrib.auth.models import User

# Create your views here.

from .forms import LoginForm, RegisterForm

User = get_user_model()


def register_view(request):
    form = RegisterForm(request.POST or None)
    if form.is_valid():
        username = form.cleaned_data.get("username")
        password = form.cleaned_data.get("password")
        password_confirm = form.cleaned_data.get("password_confirm")
        try:
            user = User.objects.create_user(username, password)
        except:
            user = None
        if user is not None:
            login(request, user)
            return redirect("/")
        else:
            request.session['register_error'] = 1
    return render(request, "forms.html", {"form": form})


def login_view(request):
    form = LoginForm(request.POST or None)
    if form.is_valid():
        username = form.cleaned_data.get("username")
        password = form.cleaned_data.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect("/")
        else:
            request.session['invalid_user'] = 1
    return render(request, "forms.html", {"form": form})


def logout_view(request):
    logout(request)
    return redirect("/login")
