import React from 'react';
import { useTranslation } from 'react-i18next';
import { useImmer } from 'use-immer';

interface AppState {
  count: number;
}

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [state, updateState] = useImmer<AppState>({ count: 0 });

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleIncrement = () => {
    updateState(draft => {
      draft.count += 1;
    });
  };

  const handleReset = () => {
    updateState(draft => {
      draft.count = 0;
    });
  };

  return (
    <div className="container mt-3 d-flex flex-column align-items-center">
      <div className="btn-group mb-3" role="group">
        <button
          type="button"
          className={`btn ${i18n.language === 'en' ? 'btn-primary' : 'btn-outline-primary'}`}
          data-testid="en"
          onClick={() => handleLanguageChange('en')}
        >
          English
        </button>
        <button
          type="button"
          className={`btn ${i18n.language === 'ru' ? 'btn-primary' : 'btn-outline-primary'}`}
          data-testid="ru"
          onClick={() => handleLanguageChange('ru')}
        >
          Русский
        </button>
      </div>
      <button
        type="button"
        className="btn btn-info mb-3"
        data-testid="counter"
        onClick={handleIncrement}
      >
        {t('clicks_interval', { postProcess: 'interval', count: state.count })}
      </button>
      <button
        type="button"
        className="btn btn-warning"
        data-testid="reset"
        onClick={handleReset}
      >
        {t('reset')}
      </button>
    </div>
  );
};

export default App;