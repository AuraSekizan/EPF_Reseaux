import axios from 'axios';
import { isEmail } from 'validator';
import ControllerPage from './page';
import ViewCreateAssos from '../views/create-associations';

const Home = class Home {
  constructor() {
    this.el = document.body;
    this.run();
  }

  onClickAjouter() {
    const elButton = document.querySelector('#valider');

    elButton.addEventListener('click', (e) => {
      e.preventDefault();

      const elInputNameassos = document.querySelector('#assosname');
      const elInputChoicecampus = document.querySelector('#choicecampus');
      const elInputDescription = document.querySelector('#description');
      const tempo = '@epfedu.fr';
      const elInputMailAssos = document.querySelector('#mailassos').value + tempo;
      if (isEmail(elInputMailAssos)) {
        const body = {
          name: elInputNameassos.value,
          campus: elInputChoicecampus.value,
          image_heade: '',
          logo: '',
          description: elInputDescription.value,
          text: 'Description',
          mail: elInputMailAssos,
          phone: '',
          socialNetworks: {
            instagram: '',
            discord: '',
            twitter: '',
            facebook: '',
            linkedin: ''
          }
        };

        axios.post('http://172.25.56.114:3000/assoc', body)
          .then((response) => {
            console.log(response);
            // Vider les champs de saisie
            elInputNameassos.value = '';
            elInputChoicecampus.value = '';
            elInputDescription.value = '';
            document.querySelector('#mailassos').value = '';
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log({
          result: 'Problem'
        });
      }
    });
  }

  run() {
    new ControllerPage(ViewCreateAssos());
    this.onClickAjouter();
  }
};

export default Home;
