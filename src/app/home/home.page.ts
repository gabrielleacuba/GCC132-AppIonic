import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  weight: number;
  height: number;
  msgClassificação: string;

  constructor(private toastController: ToastController) {}

  isFormValid() {
    return (this.height && this.weight && this.height > 0 && this.weight > 0);
  }

  onCalculate() {
    const imc = this.weight / (this.height * this.height); 
  
    if(imc < 18.5){
      this.msgClassificação = "Magreza"
    } else if ((imc >= 18.5) && (imc <= 24.9)){
      this.msgClassificação = "Normal"
    } else if (imc >= 25 && imc <= 29.9){
      this.msgClassificação = "Sobrepeso"
    } else if (imc >= 30 && imc <= 39.9){
      this.msgClassificação = "Obesidade"
    } else if (imc > 40){
      this.msgClassificação = "Obesidade Grave"
    }

    this.showMessage(`IMC = ${imc.toFixed(2)} - ${this.msgClassificação}`);
  }

  async showMessage(msg: string) {
    const previousToast = await this.toastController.getTop();
    if (previousToast) {
      await this.toastController.dismiss();
    }

    const toast = await this.toastController.create(
      {
        message: msg,
        color: 'dark',
        buttons: [
          {
            icon: 'close'
          }
        ]
      }
    );
    toast.present();
  }
}
