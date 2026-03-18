import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditions: React.FC = () => {
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
            Términos y Condiciones
          </h1>
          <p className="text-neutral-dark mb-8">
            Última actualización: Marzo 2026
          </p>

          <p className="text-neutral-dark mb-8">
            Bienvenido a ScanToEat. Estos Términos y Condiciones rigen tu acceso y uso de nuestra aplicación, incluyendo todos sus contenidos, funcionalidades y servicios proporcionados a través de la misma.
          </p>

          <div className="space-y-8 text-neutral-darkest">
            {/* Sección 1 */}
            <section>
              <h2 className="text-2xl font-bold text-primary-DEFAULT mb-4">
                1. Aceptación de los Términos
              </h2>
              <p>
                Al descargar, instalar y usar ScanToEat, aceptás plenamente estos Términos y Condiciones. Si no estás de acuerdo con cualquier parte de estos términos, no debés usar la aplicación.
              </p>
            </section>

            {/* Sección 2 */}
            <section>
              <h2 className="text-2xl font-bold text-primary-DEFAULT mb-4">
                2. Versión temprana
              </h2>
              <p>
                ScanToEat se encuentra actualmente en una fase temprana de desarrollo. Esto significa que algunas funcionalidades pueden estar incompletas, la información de ciertos productos puede no estar validada y los análisis nutricionales pueden contener imprecisiones. Trabajamos constantemente para mejorar la calidad de los datos y la experiencia del usuario.
              </p>
            </section>

            {/* Sección 3 */}
            <section>
              <h2 className="text-2xl font-bold text-primary-DEFAULT mb-4">
                3. Licencia de Uso
              </h2>
              <p className="mb-4">
                Te otorgamos una licencia limitada, no exclusiva y revocable para usar ScanToEat únicamente con propósitos personales, no comerciales. No está permitido:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Reproducir, modificar o distribuir el contenido de la aplicación.</li>
                <li>Usar la aplicación para fines comerciales o competitivos.</li>
                <li>Intentar acceder a características no autorizadas o protegidas.</li>
                <li>Usar herramientas o scripts para extraer datos de la aplicación.</li>
              </ul>
            </section>

            {/* Sección 4 */}
            <section>
              <h2 className="text-2xl font-bold text-primary-DEFAULT mb-4">
                4. Registro de Cuenta
              </h2>
              <p className="mb-4">
                Para usar ciertas funcionalidades de ScanToEat, debés crear una cuenta proporcionando información precisa y actualizada. Sos responsable de:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Mantener la confidencialidad de tu contraseña.</li>
                <li>Todas las actividades realizadas con tu cuenta.</li>
                <li>Notificarnos inmediatamente de cualquier acceso no autorizado.</li>
              </ul>
            </section>

            {/* Sección 5 */}
            <section>
              <h2 className="text-2xl font-bold text-primary-DEFAULT mb-4">
                5. Contenido del Usuario
              </h2>
              <p>
                El contenido que proporcionás es de tu responsabilidad. Garantizás que tenés derecho a proporcionar dicho contenido y que no infringe derechos de terceros.
              </p>
            </section>

            {/* Sección 6 */}
            <section>
              <h2 className="text-2xl font-bold text-primary-DEFAULT mb-4">
                6. Uso Prohibido
              </h2>
              <p className="mb-4">
                No podés usar ScanToEat para:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violar leyes o regulaciones aplicables.</li>
                <li>Realizar actos de acoso, amenaza o intimidación.</li>
                <li>Transmitir malware o código malicioso.</li>
                <li>Enviar spam o contenido no solicitado.</li>
              </ul>
            </section>

            {/* Sección 7 */}
            <section>
              <h2 className="text-2xl font-bold text-primary-DEFAULT mb-4">
                7. Información de Productos y Análisis
              </h2>
              <p>
                ScanToEat proporciona información nutricional y análisis basados en datos disponibles públicamente y generados mediante inteligencia artificial. Si bien nos esforzamos por mantener la precisión, no garantizamos que toda la información sea exacta o esté siempre actualizada. La información proporcionada por ScanToEat no constituye asesoramiento médico, nutricional ni profesional de ningún tipo. Ante cualquier duda sobre tu alimentación o salud, consultá con un profesional calificado.
              </p>
            </section>

            {/* Sección 8 */}
            <section>
              <h2 className="text-2xl font-bold text-primary-DEFAULT mb-4">
                8. Limitación de Responsabilidad
              </h2>
              <p className="mb-4">
                ScanToEat se proporciona tal cual, sin garantías. No nos hacemos responsables por:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Errores o imprecisiones en la información o análisis.</li>
                <li>Decisiones alimenticias tomadas en base a los análisis de la aplicación.</li>
                <li>Interrupciones o indisponibilidad del servicio.</li>
                <li>Daños o pérdidas derivados del uso de la aplicación.</li>
              </ul>
            </section>

            {/* Sección 9 */}
            <section>
              <h2 className="text-2xl font-bold text-primary-DEFAULT mb-4">
                9. Modificaciones de los Términos
              </h2>
              <p>
                Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Los cambios entrarán en vigor cuando publiquemos la versión actualizada. Tu uso continuado de ScanToEat constituye aceptación de los términos modificados.
              </p>
            </section>

            {/* Sección 10 */}
            <section>
              <h2 className="text-2xl font-bold text-primary-DEFAULT mb-4">
                10. Terminación
              </h2>
              <p>
                Podemos terminar o suspender tu acceso a ScanToEat en cualquier momento, sin previo aviso, por violación de estos términos.
              </p>
            </section>

            {/* Sección 11 */}
            <section>
              <h2 className="text-2xl font-bold text-primary-DEFAULT mb-4">
                11. Contacto
              </h2>
              <p>
                Si tenés preguntas o inquietudes sobre estos Términos y Condiciones, podés contactarnos a través de la sección 'Contactanos' en la aplicación.
              </p>
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

export default TermsAndConditions;
