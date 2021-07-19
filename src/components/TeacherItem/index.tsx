import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars.githubusercontent.com/u/69590972?s=200&v=4" alt="Proffy avatar" />
        <div>
          <strong>Diego Fernades</strong>
          <span>Química</span>
        </div>
      </header>

      <p>
        fdsaiufghiadsgfiasdghfuiasg
        <br /><br />
        adsfgiashdgioadshgbiouadshugioahs
        bdioghbasidghiasdh
        gviadshgigadsfgadfgsfgaaa
        adfgadfgadfga
      </p>

      <footer>
        <p>
          Price/Hour
          <strong>20,00 €</strong>
        </p>
        <button type="button">
          <img src={ whatsappIcon } alt="Whatsapp" />
          Get in touch
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem;
