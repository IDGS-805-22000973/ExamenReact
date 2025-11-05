function Maquina({ nombre, tipo, descripcion, img }) {
  return (
    <div className="card" style={{ width: "18rem", margin: "10px" }}>
      <img src={img} className="card-img-top" alt={nombre} />
      <div className="card-body">
        <h5 className="card-title">{nombre}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{tipo}</h6>
        <p className="card-text">{descripcion}</p>
      
      </div>
    
    </div>
  );
}

export default Maquina;
