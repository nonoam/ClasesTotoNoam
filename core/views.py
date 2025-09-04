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

def horarios(request):
    """Vista para reserva de horarios"""
    context = {
        'page_title': 'Reserva tu Horario',
        'profesores': [
            {
                'nombre': 'Antonio Escobar',
                'titulo': 'Especialista en Programación y Matemáticas',
                'experiencia_años': 3,
                'estudiantes': 200,
                'satisfaccion': 98,
                'especialidades': ['Python', 'C/C++', 'Cálculo', 'Excel'],
                'calendly_url': 'https://calendly.com/antonio-escobar',
                'instagram': 'a_escobar__',
            },
            {
                'nombre': 'Noam',
                'titulo': 'Experto en Ciencias y Programación',
                'experiencia_años': 4,
                'estudiantes': 150,
                'satisfaccion': 100,
                'especialidades': ['Ruby', 'Python', 'Física', 'Estadística'],
                'calendly_url': 'https://calendly.com/noam-profesor',
                'instagram': 'noamsito.o',
                'featured': True
            }
        ]
    }
    return render(request, 'core/horarios.html', context)

def metodologia(request):
    """Vista para metodología de enseñanza"""
    context = {
        'page_title': 'Nuestra Metodología',
        'duracion_clase': 90,
        'precio_individual': 25000,
        'precio_grupal': 10000,
        'minimo_grupal': 3,
    }
    return render(request, 'core/metodologia.html', context)

def clases(request):
    """Vista para gestión de clases"""
    context = {
        'page_title': 'Nuestras Especialidades',
        'total_especialidades': 8,
        'estudiantes_formados': 500,
        'tasa_exito': 95,
    }
    return render(request, 'core/clases.html', context)

def materiales(request):
    """Vista para materiales educativos"""
    context = {
        'page_title': 'Materiales de Estudio',
        'contactos': {
            'whatsapp': '+56961446847',
            'telefono_adicional': '+56959767152'
        }
    }
    return render(request, 'core/materiales.html', context)

def estudiantes(request):
    """Vista para gestión de estudiantes"""
    return HttpResponse("Página de Estudiantes - En construcción")

def evaluaciones(request):
    """Vista para gestión de evaluaciones"""
    return HttpResponse("Página de Evaluaciones - En construcción")

def reportes(request):
    """Vista para reportes y estadísticas"""
    return HttpResponse("Página de Reportes - En construcción")

def configuracion(request):
    """Vista para configuración del sistema"""
    return HttpResponse("Página de Configuración - En construcción")