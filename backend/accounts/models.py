from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models

# Create your models here.


class MyAccountManager(BaseUserManager):
    def _create_user(self, username, password, is_active, is_staff, is_superuser, **extra_fields):
        user = self.model(
            username=username,
            is_active=is_active,
            is_staff=is_staff,
            is_superuser=is_superuser,
            **extra_fields,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, password, **extra_fields):
        return self._create_user(username, password, is_active=True, is_staff=False, is_superuser=False, **extra_fields)

    def create_superuser(self, username, password, **extra_fields):
        # user = self.model(
        #     username=username,
        # )
        # user.is_active = True
        # user.is_staff = True
        # user.is_superuser = True
        user = self._create_user(username, password, is_active=True, is_staff=True, is_superuser=True, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user


class Users(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=30, blank=True, null=True)
    username = models.CharField(max_length=30, unique=True, blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
    gender = models.CharField(max_length=1, blank=True, null=True)
    weight = models.IntegerField(blank=True, null=True)
    height = models.IntegerField(blank=True, null=True)
    vegetarian = models.CharField(max_length=1, blank=True, null=True)
    max_calories = models.IntegerField(blank=True, null=True)
    # is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    # is_teacher = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    # is_super_teacher = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    objects = MyAccountManager()

    # begin

    def __str__(self):
        return str(self.username)
    #
    # def get_full_name(self):
    #     if self.name:
    #         return self.name
    #     else:
    #         return self.username
    #
    # def get_short_name(self):
    #     if self.name:
    #         return self.name
    #     else:
    #         return self.username
    #
    # def has_perm(self, perm, obj=None):
    #     return True
    #
    # def has_module_perms(self, app_label):
    #     return True
    #
    # @property
    # def is_staff(self):
    #     return self.is_staff
    #
    # @property
    # def is_admin(self):
    #     return self.is_admin
    #
    # @property
    # def is_active(self):
    #     return self.is_active

    # end

    # class Meta:
    #     db_table = "tbl_users"
    #
    # def __str__(self):
    #     return str(self.username)
    #
    # def has_perm(self, perm, obj=None):
    #     return self.is_superuser
    #
    # def has_module_perms(self, app_label):
    #     return self.is_superuser
