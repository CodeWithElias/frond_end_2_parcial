# Generated by Django 5.2.1 on 2025-06-10 03:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('authapp', '0003_estudiante_padrefamilia_estudiantepadre_persona_and_more'),
        ('estructura_academica', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Materia',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('area', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'materia',
            },
        ),
        migrations.CreateModel(
            name='Curso',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('paralelo', models.CharField(max_length=1)),
                ('gestion', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='estructura_academica.gestionacademica')),
                ('grado', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='estructura_academica.grado')),
            ],
            options={
                'db_table': 'curso',
            },
        ),
        migrations.CreateModel(
            name='CursoMateria',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bimestre', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='estructura_academica.bimestre')),
                ('curso', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='inscripcion.curso')),
                ('docente', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='authapp.docente')),
                ('materia', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='inscripcion.materia')),
            ],
            options={
                'db_table': 'curso_materia',
            },
        ),
        migrations.CreateModel(
            name='HorarioClase',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dia_semana', models.CharField(choices=[('lunes', 'Lunes'), ('martes', 'Martes'), ('miércoles', 'Miércoles'), ('jueves', 'Jueves'), ('viernes', 'Viernes')], max_length=10)),
                ('hora_inicio', models.TimeField()),
                ('hora_fin', models.TimeField()),
                ('aula', models.CharField(blank=True, max_length=50, null=True)),
                ('curso_materia', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='horarios', to='inscripcion.cursomateria')),
            ],
            options={
                'db_table': 'horario_clase',
                'ordering': ['dia_semana', 'hora_inicio'],
            },
        ),
        migrations.CreateModel(
            name='Inscripcion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_inscripcion', models.DateField(auto_now_add=True)),
                ('curso', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='inscripcion.curso')),
                ('estudiante', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='authapp.estudiante')),
                ('gestion', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='estructura_academica.gestionacademica')),
            ],
            options={
                'db_table': 'inscripcion',
                'unique_together': {('estudiante', 'curso', 'gestion')},
            },
        ),
    ]
