from django.shortcuts import render
from django.http import HttpResponse

def home(request):
    """Vista principal del dashboard"""
    context = {
        'page_title': 'Dashboard Principal',
        'total_clases': 24,
        'total_estudiantes': 156,
        'asistencia_promedio': 89,
        'evaluaciones_pendientes': 12,
    }
    return render(request, 'core/home.html', context)

def clases(request):
    """Vista para gestión de clases"""
    return HttpResponse("Página de Clases - En construcción")

def estudiantes(request):
    """Vista para gestión de estudiantes"""
    return HttpResponse("Página de Estudiantes - En construcción")

def horarios(request):
    """Vista para gestión de horarios"""
    return HttpResponse("Página de Horarios - En construcción")

def materiales(request):
    """Vista para gestión de materiales educativos"""
    return HttpResponse("Página de Materiales - En construcción")

def evaluaciones(request):
    """Vista para gestión de evaluaciones"""
    return HttpResponse("Página de Evaluaciones - En construcción")

def reportes(request):
    """Vista para reportes y estadísticas"""
    return HttpResponse("Página de Reportes - En construcción")

def configuracion(request):
    """Vista para configuración del sistema"""
    return HttpResponse("Página de Configuración - En construcción")