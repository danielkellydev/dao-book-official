/**
 @typedef dashboardButtonProps
 @type {Object}
 @property {string} buttonText 
 @property {React.MouseEventHandler<HTMLButtonElement>} clickHandler
 */

/**
 * @param {dashboardButtonProps} props
 */
function DashboardButton({ buttonText, onClick }) {
  return (
    <button
      onClick={onClick}
      className=" h-56 max-w-[220px] rounded-2xl border-4 border-daobook-amber bg-daobook-amber p-10 text-center font-sans text-3xl font-semibold text-white shadow-md ring-violet-500 transition-colors transition-transform hover:scale-105 hover:bg-daobook-amber/80 focus:ring active:brightness-75 dark:bg-black"
    >
      {buttonText}
    </button>
  );
}

export default DashboardButton;
