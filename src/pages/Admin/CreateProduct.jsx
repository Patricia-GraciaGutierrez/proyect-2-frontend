import { useNavigate } from "react-router-dom";
import ProductForm from "../../components/forms/ProductForm";
import { createProduct } from "../../services/ProductService";

function CreateProduct() {
  const navigate = useNavigate();

  const handleSubmit = (productData) => {
    createProduct(productData)
      .then(() => {
        alert("Producto creado exitosamente");
        navigate("/admin");
      })
      .catch((error) => console.error("Error creating product:", error));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 ml-64">Crear Producto</h1>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}

export default CreateProduct;