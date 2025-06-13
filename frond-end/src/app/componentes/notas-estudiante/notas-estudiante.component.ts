import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicio/api.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { UserService, Usuario } from '../user/autenticacion';

@Component({
  selector: 'app-notas-estudiante',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notas-estudiante.component.html',
  styleUrls: ['./notas-estudiante.component.css'],
  providers: [DatePipe]
})
export class NotasEstudianteComponent implements OnInit {
  notas: any[] = [];
  asistencia: any[] = [];
  participacion: any[] = [];
  estudianteId: number = 0; // Para pruebas, luego obtener dinámicamente
  chartNotas: any;
  chartAsistencia: any;
  chartParticipacion: any;
  predicciones: any[] = [];
  recomendaciones: any[] = [];
  estudianteNombre: string = '';

  constructor(private apiService: ApiService, private datePipe: DatePipe, private userService: UserService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
  const usuario = this.userService.getUsuario();
    if (usuario) {
      this.estudianteId = usuario.id;
      console.log('ID del usuario logueado:', this.estudianteId);
    // Aquí puedes usar ese ID para cargar datos, redirigir, etc.
    }
    this.cargarNotas();
    this.cargarAsistencia();
    this.cargarParticipacion();
    this.cargarPredicciones();
  }

  cargarNotas(): void {
    this.apiService.getNotasEstudiante(this.estudianteId).subscribe({
      next: (data) => {
        this.notas = data;
        console.log('Notas del estudiante:', data);
        this.crearGraficoNotas();
      },
      error: (error) => {
        console.error('Error al obtener notas del estudiante:', error);
      }
    });
  }

  cargarAsistencia(): void {
    this.apiService.getAsistenciaEstudiante(this.estudianteId).subscribe({
      next: (data) => {
        this.asistencia = data;
        console.log('Asistencia del estudiante:', data);
        this.crearGraficoAsistencia();
      },
      error: (error) => {
        console.error('Error al obtener asistencia del estudiante:', error);
      }
    });
  }

  cargarParticipacion(): void {
    this.apiService.getParticipacionEstudiante(this.estudianteId).subscribe({
      next: (data) => {
        this.participacion = data;
        console.log('Participación del estudiante:', data);
        this.crearGraficoParticipacion();
      },
      error: (error) => {
        console.error('Error al obtener participación del estudiante:', error);
      }
    });
  }

  formatDate(fecha: string): string | null {
    return this.datePipe.transform(fecha, 'short');
  }

  crearGraficoNotas(): void {
    if (this.chartNotas) {
      this.chartNotas.destroy();
    }

    const etiquetas = this.notas.map(nota => `${nota.materia} - Bim ${nota.bimestre}`);
    const datos = this.notas.map(nota => nota.nota);

    const canvas = document.getElementById('notasChart') as HTMLCanvasElement;
    if (!canvas) {
      console.error('No se encontró el canvas para el gráfico de notas');
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('No se pudo obtener el contexto del canvas para el gráfico de notas');
      return;
    }

    this.chartNotas = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: etiquetas,
        datasets: [{
          label: 'Nota',
          data: datos,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: function(context) {
                return `Nota: ${context.parsed.y}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }

  crearGraficoAsistencia(): void {
    if (this.chartAsistencia) {
      this.chartAsistencia.destroy();
    }

    // Agrupar asistencia por estado (presente, ausente, justificado) y contar por bimestre
    const estadosPorBimestre: {[key: string]: {[key: string]: number}} = {};
    this.asistencia.forEach(item => {
      const bimestre = item.bimestre;
      const estado = item.estado;
      if (!estadosPorBimestre[bimestre]) {
        estadosPorBimestre[bimestre] = {};
      }
      if (!estadosPorBimestre[bimestre][estado]) {
        estadosPorBimestre[bimestre][estado] = 0;
      }
      estadosPorBimestre[bimestre][estado]++;
    });

    const bimestres = Object.keys(estadosPorBimestre).sort();
    const presentes = bimestres.map(bim => estadosPorBimestre[bim]['presente'] || 0);
    const ausentes = bimestres.map(bim => estadosPorBimestre[bim]['ausente'] || 0);
    const justificados = bimestres.map(bim => estadosPorBimestre[bim]['justificado'] || 0);

    const canvas = document.getElementById('asistenciaChart') as HTMLCanvasElement;
    if (!canvas) {
      console.error('No se encontró el canvas para el gráfico de asistencia');
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('No se pudo obtener el contexto del canvas para el gráfico de asistencia');
      return;
    }

    this.chartAsistencia = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: bimestres,
        datasets: [
          {
            label: 'Presente',
            data: presentes,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'Ausente',
            data: ausentes,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
          {
            label: 'Justificado',
            data: justificados,
            backgroundColor: 'rgba(255, 206, 86, 0.6)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            enabled: true
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }

  crearGraficoParticipacion(): void {
    if (this.chartParticipacion) {
      this.chartParticipacion.destroy();
    }

    const etiquetas = this.participacion.map(p => this.formatDate(p.fecha) || '');
    const datos = this.participacion.map(p => parseFloat(p.puntaje));

    const canvas = document.getElementById('participacionChart') as HTMLCanvasElement;
    if (!canvas) {
      console.error('No se encontró el canvas para el gráfico de participación');
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('No se pudo obtener el contexto del canvas para el gráfico de participación');
      return;
    }

    this.chartParticipacion = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: etiquetas,
        datasets: [{
          label: 'Puntaje',
          data: datos,
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: function(context) {
                return `Puntaje: ${context.parsed.y}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 5
          }
        }
      }
    });
  }


  cargarPredicciones(): void {
    this.apiService.getPrediccionesEstudiante(this.estudianteId).subscribe({
      next: (data) => {
        this.estudianteNombre = data.estudiante.nombre;
        this.predicciones = data.predicciones;
        this.recomendaciones = data.recomendaciones;
        this.generarGraficoPredicciones(); // opcional para visualizar en gráfico
      },
      error: (error) => {
        console.error('Error al cargar predicciones:', error);
      }
    });
  }


  generarGraficoPredicciones(): void {
    const labels = this.predicciones.map(p => 'Bim. ' + p.bimestre_id);
    const datos = this.predicciones.map(p => p.puntaje_predicho);

    const ctx = document.getElementById('notasChart') as HTMLCanvasElement;
    if (this.chartNotas) this.chartNotas.destroy();

    this.chartNotas = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Puntaje Predicho',
          data: datos,
          backgroundColor: datos.map(score =>
            score < 40 ? 'rgba(255, 99, 132, 0.6)' : score < 70 ? 'rgba(255, 206, 86, 0.6)' : 'rgba(75, 192, 192, 0.6)'
          ),
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }


  obtenerRecomendacionesPorBimestre(bimestreId: number): string[] {
    const rec = this.recomendaciones.find(r => r.bimestre_id === bimestreId);
    return rec ? rec.recomendaciones : [];
  }

}
