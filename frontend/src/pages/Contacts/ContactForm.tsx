import { useState } from 'react';
import type { FormEvent } from 'react';
import type { ContactsText } from './contacts.en';

interface ContactFormProps {
  text: ContactsText;
}

const ContactForm = ({ text }: ContactFormProps) => {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSent(true);
  };

  return (
    <form className="contacts-form" onSubmit={handleSubmit}>
      <div className="contacts-form__header">
        <h2>{text.formTitle}</h2>
        <p>{isSent ? text.sentText : text.formIntro}</p>
      </div>

      {isSent && <strong className="contacts-form__status">{text.sentTitle}</strong>}

      <label>
        {text.nameLabel}
        <input required type="text" placeholder={text.namePlaceholder} />
      </label>

      <label>
        {text.mailLabel}
        <input required type="email" placeholder={text.mailPlaceholder} />
      </label>

      <label>
        {text.messageLabel}
        <textarea required rows={5} placeholder={text.messagePlaceholder} />
      </label>

      <button type="submit">{text.submit}</button>
    </form>
  );
};

export default ContactForm;
