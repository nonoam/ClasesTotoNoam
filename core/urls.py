from django.urls import path
from . import views

app_name = 'core'

urlpatterns = [
    path('', views.home, name='home'),
    path('clases/', views.clases, name='clases'),
    path('estudiantes/', views.estudiantes, name='estudiantes'),
    path('horarios/', views.horarios, name='horarios'),
    path('materiales/', views.materiales, name='materiales'),
    path('evaluaciones/', views.evaluaciones, name='evaluaciones'),
    path('reportes/', views.reportes, name='reportes'),
    path('configuracion/', views.configuracion, name='configuracion'),
]