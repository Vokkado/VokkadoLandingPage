import React from 'react';
import { Link } from 'react-router-dom';

const DeleteAccount: React.FC = () => {
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

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-primary-DEFAULT mb-4">
            Eliminación de cuenta y datos
          </h1>
          <p className="text-neutral-dark mb-8">
            Última actualización: {new Date().toLocaleDateString('es-UY')}
          </p>

          <p className="text-neutral-dark mb-8">
            En Vokkado respetamos tu derecho a controlar tus datos personales. En esta página
            encontrás toda la información sobre cómo solicitar la eliminación de tu cuenta y/o
            tus datos.
          </p>

          <div className="space-y-8 text-neutral-darkest">

            {/* Cómo solicitar */}
            <section>
              <h2 className="text-2xl font-bold text-primary-DEFAULT mb-4">
                1. Cómo solicitar la eliminación
              </h2>
              <p className="mb-4">
                Podés realizar tu solicitud directamente desde la aplicación siguiendo estos pasos:
              </p>
              <ol className="list-decimal list-inside space-y-3 ml-4">
                <li>Abrí la app <strong>Vokkado</strong> e ingresá a tu cuenta.</li>
                <li>Tocá el ícono de menú (<strong>☰</strong>) en la esquina superior derecha de la pantalla y seleccioná <strong>Otras funciones</strong>.</li>
                <li>Seleccioná <strong>Ayuda y reportes</strong>.</li>
                <li>Tocá <strong>Solicitar eliminación de cuenta</strong>.</li>
                <li>
                  Escribí una breve descripción indicando si querés:
                  <ul className="list-disc list-inside space-y-1 ml-6 mt-2">
                    <li><strong>Desactivar tu cuenta</strong> (tus datos se conservan pero tu perfil queda inactivo), o</li>
                    <li><strong>Eliminar tu cuenta y todos tus datos</strong> de forma permanente.</li>
                  </ul>
                </li>
                <li>Enviá la solicitud. Recibiremos tu pedido y lo procesaremos en un plazo de hasta <strong>15 días hábiles</strong>.</li>
              </ol>
              <p className="mt-4">
                También podés enviar tu solicitud directamente por correo electrónico a{' '}
                <a
                  href="mailto:contact@vokkado.com?subject=Solicitud%20de%20eliminación%20de%20cuenta"
                  className="text-primary-DEFAULT underline hover:text-primary-dark"
                >
                  contact@vokkado.com
                </a>{' '}
                con el asunto <em>"Solicitud de eliminación de cuenta"</em>.
              </p>
            </section>

            {/* Tipos de solicitud */}
            <section>
              <h2 className="text-2xl font-bold text-primary-DEFAULT mb-4">
                2. Tipos de solicitud
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-neutral-lightest rounded-xl p-6 border border-neutral-light">
                  <h3 className="text-lg font-semibold text-primary-DEFAULT mb-2">Desactivación de cuenta</h3>
                  <p className="text-sm text-neutral-dark">
                    Tu perfil queda inactivo y no podrás acceder a la aplicación. Tus datos se conservan
                    internamente. Si en el futuro querés reactivar tu cuenta, podés contactarnos.
                  </p>
                </div>
                <div className="bg-neutral-lightest rounded-xl p-6 border border-neutral-light">
                  <h3 className="text-lg font-semibold text-primary-DEFAULT mb-2">Eliminación completa</h3>
                  <p className="text-sm text-neutral-dark">
                    Se elimina de forma permanente tu cuenta y todos los datos asociados. Esta acción
                    no es reversible.
                  </p>
                </div>
              </div>
            </section>

            {/* Qué datos se eliminan */}
            <section>
              <h2 className="text-2xl font-bold text-primary-DEFAULT mb-4">
                3. Datos que se eliminan
              </h2>
              <p className="mb-4">
                Al solicitar la eliminación completa, se borran permanentemente los siguientes datos:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Perfil de usuario (nombre, correo electrónico, altura)</li>
                <li>Restricciones y metas del usuario</li>
                <li>Historial de escaneos de productos</li>
                <li>Preferencias y configuraciones personales</li>
              </ul>
            </section>

            {/* Tiempo de respuesta */}
            <section>
              <h2 className="text-2xl font-bold text-primary-DEFAULT mb-4">
                4. Tiempo de respuesta
              </h2>
              <p>
                Procesamos todas las solicitudes en un plazo máximo de <strong>15 días hábiles</strong> desde
                la recepción. Te notificaremos por correo electrónico una vez que tu solicitud haya sido procesada.
              </p>
            </section>

            {/* Contacto */}
            <section>
              <h2 className="text-2xl font-bold text-primary-DEFAULT mb-4">
                5. Contacto
              </h2>
              <p>
                Si tenés dudas sobre este proceso o sobre el manejo de tus datos, podés escribirnos a{' '}
                <a
                  href="mailto:contact@vokkado.com"
                  className="text-primary-DEFAULT underline hover:text-primary-dark"
                >
                  contact@vokkado.com
                </a>.
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

export default DeleteAccount;
