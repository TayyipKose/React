import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
reportWebVitals();

/**
 * 1- const root = ReactDOM.createRoot(document.getElementById('root'));
 *    - Angular'daki `bootstrapModule(AppModule)` gibi düşünebilirsin.
 *    - DOM'da <div id="root"> elementini buluyoruz ve React uygulamasını buraya bağlıyoruz.
 *    - `createRoot` React 18+ ile gelen, daha modern ve hızlı root render yöntemi.
 *
 * 2- root.render(
 *      <React.StrictMode>
 *        <App />
 *      </React.StrictMode>
 *    );
 *    - Angular'daki <app-root> gibi, App component'ini DOM'a render ediyoruz.
 *    - React.StrictMode:
 *        * Sadece geliştirme sırasında bazı hataları ve potansiyel problemleri gösterir.
 *        * Production build'de etkisi yoktur.
 *
 * 3-reportWebVitals();
 *    - Performans ölçmek için kullanılan bir fonksiyon.
 *    - Örneğin sayfa yüklenme süresi, render süreleri gibi metrikleri loglayabilir veya analytics servisine gönderebilirsin.
 *    - Zorunlu değil, uygulamanın çalışması buna bağlı değil.
 */
