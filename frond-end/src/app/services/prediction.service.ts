import { Injectable } from '@angular/core';

export interface Prediction {
  id: number;
  studentId: number;
  predictedGrade: number;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private storageKey = 'predictions';

  constructor() {}

  getPredictions(): Prediction[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private savePredictions(predictions: Prediction[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(predictions));
  }

  addPrediction(prediction: Prediction): void {
    const predictions = this.getPredictions();
    predictions.push(prediction);
    this.savePredictions(predictions);

    // Código para consumir API backend (comentado)
    // this.http.post('https://api.example.com/predictions', prediction).subscribe();
  }

  updatePrediction(prediction: Prediction): void {
    const predictions = this.getPredictions();
    const index = predictions.findIndex(p => p.id === prediction.id);
    if (index !== -1) {
      predictions[index] = prediction;
      this.savePredictions(predictions);

      // Código para consumir API backend (comentado)
      // this.http.put(`https://api.example.com/predictions/${prediction.id}`, prediction).subscribe();
    }
  }

  deletePrediction(id: number): void {
    let predictions = this.getPredictions();
    predictions = predictions.filter(p => p.id !== id);
    this.savePredictions(predictions);

    // Código para consumir API backend (comentado)
    // this.http.delete(`https://api.example.com/predictions/${id}`).subscribe();
  }
}
