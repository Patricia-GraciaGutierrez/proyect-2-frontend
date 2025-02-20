import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../../services/ProductService";
import { toast } from "react-toastify"

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getProductById(id)
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (comment.trim() === "") return;

    const newComment = {
      id: Date.now(),
      text: comment,
      date: new Date().toLocaleString(),
    };

    setComments([...comments, newComment]);
    setComment("");
  };

  if (!product) return <div className="text-center text-lg p-6">Cargando...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
        <p className="text-lg text-gray-600 mb-2">{product.brand}</p>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-contain rounded-md mb-4"
        />
        <p className="text-gray-600 mb-2">{product.capacity}</p>
        <p className="text-gray-500">{product.category}</p>
        <p className="text-xl font-bold text-green-600 mt-4">
          {product.price.toString().replace(".", ",")}
          €</p>
        <button
          onClick={() => {
            toast.success("Tu producto se ha añadido al carrito 🎉", {
              style: {
                fontSize: "1.2rem",
                padding: "16px",
                width: "420px",
              },
            });
          }}
          className="bg-green-500 text-white px-6 py-3 rounded-md mt-4 hover:bg-green-600 transition text-lg cursor-pointer"
        >
          Añadir 🛒
        </button>
      </div>

      {/* Descripción y composición */}
      <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-gray-800">Descripción</h2>
        <p className="text-gray-700 mt-2">{product.description}</p>
      </div>

      <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-gray-800">Composición</h2>
        <p className="text-gray-700 mt-2">{product.ingredients}</p>
      </div>

      {/* Sección de comentarios */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Comentarios</h2>

        {/* Formulario de comentarios */}
        <form onSubmit={handleSubmitComment} className="mb-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escribe tu comentario..."
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 transition"
          >
            Enviar Comentario
          </button>
        </form>

        {/* Lista de comentarios */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border p-4 rounded-lg shadow-md bg-gray-50">
              <p className="text-gray-700">{comment.text}</p>
              <p className="text-sm text-gray-500 mt-2">{comment.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
