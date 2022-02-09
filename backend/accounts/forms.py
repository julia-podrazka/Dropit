from django.contrib.auth import get_user_model
from django import forms

User = get_user_model()


class RegisterForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(label='Password', widget=forms.PasswordInput)
    password_confirm = forms.CharField(label='Confirm password', widget=forms.PasswordInput)

    def clean_username(self):
        username = self.cleaned_data.get("username")
        search_user = User.objects.filter(username__iexact=username)
        if search_user.exists():
            raise forms.ValidationError("Invalid user.")
        return username


class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)

    def clean_username(self):
        username = self.cleaned_data.get("username")
        search_user = User.objects.filter(username__iexact=username)
        if not search_user.exists():
            raise forms.ValidationError("User does not exist.")
        return username
