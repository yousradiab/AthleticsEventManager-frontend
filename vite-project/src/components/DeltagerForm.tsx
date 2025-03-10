import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Deltager, createDeltager } from "../api/api";

export function DeltagerForm() {
  // Initialiserer deltager state med useState hook
  const [deltager, setDeltager] = useState<Deltager>({
    id: 0,
    name: "",
    kon: "",
    alder: 0,
    klub: "",
    discipliner: [],
    resultater: [],
  });

  // Initialiserer disciplin state med useState hook
  const [disciplin, setDisciplin] = useState({
    id: 0,
    navn: "",
    resultatType: "",
  });

  const navigate = useNavigate();

  // useEffect hook til at logge initial state, når komponenten monteres
  useEffect(() => {
    console.log("Component mounted");
    console.log("Initial deltager state:", deltager);
    console.log("Initial disciplin state:", disciplin);
  }, [deltager, disciplin]);

  // Handler til at opdatere deltager state ved input ændring
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeltager((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handler til at opdatere disciplin state ved input ændring
  const handleDisciplinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDisciplin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Funktion til at tilføje en ny disciplin til deltageren
  const addDisciplin = () => {
    console.log("Adding disciplin:", disciplin);
    if (disciplin.navn && disciplin.resultatType) {
      setDeltager((prevState) => {
        const newState = {
          ...prevState,
          discipliner: [
            ...prevState.discipliner,
            { ...disciplin, id: prevState.discipliner.length + 1 },
          ],
        };
        console.log("New deltager state after adding discipline:", newState);
        return newState;
      });
    }
    setDisciplin({ id: 0, navn: "", resultatType: "" });
  };

  // Handler til at sende deltager data til serveren ved form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Submitting deltager:", deltager);
      await createDeltager(deltager);
      navigate("/deltager");
    } catch (error) {
      console.error("Failed to create deltager:", error);
      alert("Failed to create deltager. Check the console for more details.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Opret Deltager
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          {/* Input felt for deltagerens navn */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Navn
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={deltager.name}
              onChange={handleChange}
            />
          </div>

          {/* Input felt for deltagerens køn */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="kon"
            >
              Køn
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="kon"
              type="text"
              name="kon"
              value={deltager.kon}
              onChange={handleChange}
            />
          </div>

          {/* Input felt for deltagerens alder */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="alder"
            >
              Alder
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="alder"
              type="number"
              name="alder"
              value={deltager.alder}
              onChange={handleChange}
            />
          </div>

          {/* Input felt for deltagerens medlemsklub */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="klub"
            >
              Medlemsklub
            </label>
            Vælg mellem: Klub1, Klub2, Klub3, Klub4, Klub5
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="klub"
              type="text"
              name="klub"
              value={deltager.klub}
              onChange={handleChange}
            />
          </div>

          {/* Sektion for at tilføje discipliner til deltageren */}
          <div className="mb-4">
            <h3 className="text-md font-semibold mb-1 text-gray-700">
              Discipliner{" "}
              <span className="text-sm">
                ( Vælg mellem: 100m løb, Spydkast, Diskoskast, Trespring,
                Højdespring)
              </span>
            </h3>
            {/* Viser de allerede tilføjede discipliner */}
            {deltager.discipliner.map((d, index) => (
              <div key={index} className="flex items-center">
                <p className="mr-2">
                  {d.navn} - {d.resultatType}
                </p>
              </div>
            ))}
            {/* Input felt for disciplin navn */}
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              id="disciplinNavn"
              type="text"
              name="navn"
              placeholder="Disciplin navn"
              value={disciplin.navn}
              onChange={handleDisciplinChange}
            />{" "}
            resultat typer: 100m løb (Tid), Spydkast (Afstand), Diskoskast
            (Afstand), Trespring (Point), Højdespring (Tid).
            {/* Input felt for disciplin resultat type */}
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              id="disciplinResultatType"
              type="text"
              name="resultatType"
              placeholder="Resultat Type"
              value={disciplin.resultatType}
              onChange={handleDisciplinChange}
            />
            {/* Knappen til at tilføje disciplin til deltageren */}
            <button
              type="button"
              onClick={addDisciplin}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Tilføj Disciplin
            </button>
          </div>

          {/* Knappen til at indsende formen */}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Opret
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeltagerForm;
