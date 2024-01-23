import { ChangeEvent, useEffect, useState } from "react";
import Categoria from "../../../assets/models/Categoria";
import { useNavigate, useParams } from "react-router-dom";
import { atualizar, buscar, cadastrar } from "../../../service/Service";

function FormularioCategoria() {
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
  
    let navigate = useNavigate();
  
    const { id } = useParams<{ id: string }>();
  
    async function buscarPorId(id: string) {
      await buscar(`/categorias/${id}`, setCategoria, {
      });
    }
  
    useEffect(() => {
      if (id !== undefined) {
        buscarPorId(id)
      }
    }, [id])
  
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
      setCategoria({
        ...categoria,
        [e.target.name]: e.target.value
      })
  
      console.log(JSON.stringify(categoria))
    }
  
    async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
      e.preventDefault()
  
      if (id !== undefined) {
        try {
          await atualizar(`/categorias`, categoria, setCategoria, {
          })
  
          alert('Categoria atualizada com sucesso')
          retornar()
  
        } catch (error: any) {
          if (error.toString().includes('404')) {
            alert('Categoria não encontrada')
            handleLogout()
          } else {
            alert('Erro ao atualizar a Categoria')
          }
  
        }
  
      } else {
        try {
          await cadastrar(`/categorias`, categoria, setCategoria, {
          })
  
          alert('Categoria cadastrada com sucesso')
  
        } catch (error: any) {
          if (error.toString().includes('400')) {
            alert('Erro de sintaxe, digite corretamente')
            handleLogout()
          } else {
            alert('Erro ao cadastrado da Categoria')
          }
        }
      }
  
      retornar()
    }
  
    function retornar() {
      navigate("/categorias")
    }
  
  
    return (
      <div className="container flex flex-col items-center justify-center mx-auto">
        <h1 className="text-4xl text-center my-8">
          {id === undefined ? 'Cadastre uma nova categoria' : 'Editar categoria'}
        </h1>
  
        <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovaCategoria}>
          <div className="flex flex-col gap-2">
            <label htmlFor="tipo">Tipo da Categoria</label>
            <input
              type="text"
              placeholder="tipo"
              name='tipo'
              className="border-2 border-slate-700 rounded p-2"
              value={categoria.tipo}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <button
            className="rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto block"
            type="submit"
          >
            {id === undefined ? 'Cadastrar' : 'Editar'}
          </button>
        </form>
      </div>
    );
  }
  
  export default FormularioCategoria;

function handleLogout() {
  throw new Error("Function not implemented.");
}

