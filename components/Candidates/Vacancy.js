import { Draggable } from 'react-beautiful-dnd'

const Vacancy = ({ vacancy }) => {
  const {
    fullName,
    location,
    calification,
    profilePercentage,
    affinityPercentage,
  } = vacancy

  return (
    <div className="Vacancy">
      <div className="Vacancy__infoContainer">
        <div className="Vacancy__avatar" />
        <div className="Vacancy__info">
          <div className="Vacancy__name">{fullName}</div>
          <div className="Vacancy__location">{location}</div>
          <div className="Vacancy__calification">
            {`Reporte prueba - ${calification}`}
          </div>
        </div>
      </div>
      <div className="Vacancy__bottom">
        <div className="Vacancy__profilePercentage">{`Perfil al ${profilePercentage}%`}</div>
        <div className="Vacancy__affinityPercentage">{`Perfil al ${affinityPercentage}%`}</div>
      </div>
    </div>
  )
}

export default Vacancy
