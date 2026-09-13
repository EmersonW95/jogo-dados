export default function Dado({ valor }) {
  const src = valor ? `/dice/dado-${valor}.svg` : "/dice/dado-vazio.svg";
  const alt = valor ? `Dado com valor ${valor}` : "Dado ainda não jogado";

  return <img className="dado" src={src} alt={alt} />;
}
