import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-lightest py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Botón volver */}
        <Link 
          to="/" 
          className="inline-flex items-center text-primary-DEFAULT hover:text-primary-dark mb-8 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver al inicio
        </Link>

        {/* Contenido */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-primary-DEFAULT mb-4">
            Política de Privacidad
          </h1>
          <p className="text-neutral-dark mb-8">
            Última actualización: {new Date().toLocaleDateString('es-UY')}
          </p>

          <p className="text-neutral-dark mb-8">
            Esta Política de Privacidad explica cómo ScanToEat (en adelante, "la Aplicación" o "nosotros") recopila, utiliza y protege los datos personales proporcionados por los usuarios que se preregistran en nuestra landing page.
          </p>

          <div className="space-y-8 text-neutral-darkest">
            {/* Sección 1 */}
            <section>
              <h2 className="text-2xl font-bold text-primary-DEFAULT mb-4">
                1. Responsable del tratamiento
              </h2>
              <p className="mb-4">
                ScanToEat es el responsable del tratamiento de los datos personales ingresados en el formulario de preregistro.

                Correo de contacto: scantoeat.life@gmail.com
              </p>
            </section>

            {/* Sección 2 */}
            <section>
              <h2 className="text-2xl font-bold text-primary-DEFAULT mb-4">
                2. Datos que recopilamos
              </h2>
              <p className="mb-4">
                Para el preregistro, recopilamos únicamente:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Correo electrónico</li>
                <li>Nombre</li>
              </ul>
            </section>

            {/* Sección 3 */}
            <section>
              <h2 className="text-2xl font-bold text-primary-DEFAULT mb-4">
                3. Finalidad del tratamiento
              </h2>
              <p className="mb-4">
                Los datos proporcionados serán utilizados exclusivamente para:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Enviar novedades, noticias y actualizaciones relacionadas con el desarrollo de ScanToEat.</li>
                <li>Notificar al usuario sobre el lanzamiento de la Aplicación y el acceso anticipado.</li>
            </ul>
            <p className="mt-4">
                No utilizaremos los datos para finalidades distintas a las indicadas sin obtener previamente un nuevo consentimiento.
              </p>
            </section>

            {/* Sección 4 */}
            <section>
              <h2 className="text-2xl font-bold text-primary-DEFAULT mb-4">
                4. Base legal
              </h2>
              <p>
                El tratamiento se realiza sobre la base del consentimiento previo, expreso e informado otorgado por el usuario al marcar la casilla de aceptación del formulario de preregistro, conforme a la Ley N.º 18.331 de Protección de Datos Personales de Uruguay.
              </p>
            </section>

            {/* Sección 5 */}
            <section>
              <h2 className="text-2xl font-bold text-primary-DEFAULT mb-4">
                5. Conservación de los datos
              </h2>
              <p className="mb-4">
                Los datos se conservarán únicamente mientras:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>El usuario mantenga su interés en recibir novedades, o</li>
                <li>Sea necesario para cumplir con las finalidades informadas.</li>
              </ul>
              <p className="mt-4">
                El usuario puede solicitar la eliminación de sus datos en cualquier momento.
              </p>
            </section>

            {/* Sección 6 */}
            <section>
              <h2 className="text-2xl font-bold text-primary-DEFAULT mb-4">
                6. Derechos del usuario
              </h2>
              <p className="mb-4">
                De acuerdo con la Ley N.º 18.331, el usuario tiene derecho a:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Acceder a sus datos personales.</li>
                <li>Rectificar información incorrecta o incompleta.</li>
                <li>Solicitar la eliminación de sus datos..</li>
                <li>Retirar su consentimiento.</li>
              </ul>
              <p className="mt-4">
                Para ejercer estos derechos, el usuario puede escribir a: scantoeat.life@gmail.com.
              </p>
            </section>

            {/* Sección 7 */}
            <section>
              <h2 className="text-2xl font-bold text-primary-DEFAULT mb-4">
                7. Seguridad de la información
              </h2>
              <p className="mb-4">
                Adoptamos medidas técnicas y organizativas razonables para proteger los datos frente a:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Acceso no autorizado.</li>
                <li>Pérdida o destrucción accidental.</li>
                <li>Alteración o divulgación indebida.</li>
              </ul>
            </section>

            {/* Sección 8 */}
            <section>
              <h2 className="text-2xl font-bold text-primary-DEFAULT mb-4">
                8. Cesión, transferencia y servicios de terceros
              </h2>
              <p className="mb-4">
                No compartimos, vendemos ni cedemos los datos personales a terceros, salvo obligación legal o cuando sea necesario para cumplir con las finalidades informadas.
              </p>
              <h3 className="text-2xl font-bold text-primary-DEFAULT mb-4">
                Servicios utilizados
              </h3>
              <p className="mb-4">
                Podemos utilizar servicios de terceros que procesan datos en nuestro nombre, como herramientas de analítica, infraestructura o envío de emails. Estos proveedores cumplen con estándares adecuados de protección de datos.
                </p>
                <h3 className="text-2xl font-bold text-primary-DEFAULT mb-4">
                Google Analytics
              </h3>
              <p className="mb-4">
                Utilizamos Google Analytics para analizar cómo los usuarios interactúan con nuestra landing page y/o la aplicación. Google Analytics recopila información como:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Páginas visitadas</li>
                <li>Tiempo de permanencia</li>
                <li>Dispositivo y navegador</li>
                <li>Interacciones básicas dentro del sitio</li>
              </ul>
                <p className="mt-4">
                    Toda la información se utiliza únicamente con fines estadísticos y para mejorar la experiencia del usuario. Google puede almacenar esta información en servidores fuera de Uruguay, aplicando sus propias políticas de privacidad.
                    El usuario puede obtener más información en la Política de Privacidad de Google.
                </p>
            </section>

            {/* Sección 9 */}
            <section>
              <h2 className="text-2xl font-bold text-primary-DEFAULT mb-4">
                9. Modificaciones a esta Política
              </h2>
              <p>
                Podemos actualizar esta Política de Privacidad para reflejar cambios legales o mejoras en nuestros procesos. Notificaremos cualquier modificación relevante en nuestra landing o por correo electrónico.
            </p>
            </section>

            {/* Sección 10 */}
            <section>
              <h2 className="text-2xl font-bold text-primary-DEFAULT mb-4">
                10. Contacto
              </h2>
              <p className="mb-2">
                Para consultas sobre esta Política o sobre el manejo de tus datos personales podés escribir a:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                <li>scantoeat.life@gmail.com</li>
              </ul>
            </section>
          
          </div>

          {/* Botón volver abajo */}
          <div className="mt-12 pt-8 border-t border-neutral-light">
            <Link 
              to="/" 
              className="inline-flex items-center justify-center w-full sm:w-auto bg-secondary-dark text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
