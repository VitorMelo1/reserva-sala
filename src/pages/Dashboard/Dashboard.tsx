import React, { useState } from "react";
import style from "./Dashboard.module.scss";
import SalaCard from "../../components/SalaCard/SalaCard";
import Header from "../../layouts/Header/Header";
import DonutChart from "../../components/DonutChart/DonutChart";

// Dados mockados - futuramente será substituído por dados da API
const salasMock = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    bloco: i % 2 === 0 ? "A" : "B", // alterna entre Bloco A e B
    nome: `Sala ${100 + i + 1}`,   // nomes tipo "Sala 101", "Sala 102"...
    capacidade: Math.floor(Math.random() * 31) + 20, // capacidade entre 20 e 50
    ocupada: Math.random() < 0.5, // status aleatório de ocupação
}));

const Dashboard: React.FC = () => {
    // Filtros controlados via estado
    const [filtroBloco, setFiltroBloco] = useState("todos");
    const [filtroCapacidade, setFiltroCapacidade] = useState(0);
    const [filtroNome, setFiltroNome] = useState("");

    // Filtra as salas com base nos filtros aplicados
    const salasFiltradas = salasMock
        .filter((sala) => {
            const blocoOk = filtroBloco === "todos" || sala.bloco === filtroBloco;
            const capacidadeOk = sala.capacidade >= filtroCapacidade;
            const nomeOk = sala.nome.toLowerCase().includes(filtroNome.toLowerCase());
            return blocoOk && capacidadeOk && nomeOk;
        })
        .sort((a, b) => Number(a.ocupada) - Number(b.ocupada)); // Ordena: livres primeiro

    // Estatísticas rápidas
    const salasDisponiveis = salasFiltradas.filter(s => !s.ocupada).length;
    const salasOcupadas = salasFiltradas.filter(s => s.ocupada).length;

    return (
        <div className={style.dashboard_container}>
            {/* Cabeçalho do dashboard */}
            <Header
                titulo="Dashboard de Reservas"
                subtitulo="Visualize a ocupação das salas em tempo real."
            >
                {/* Indicadores de status */}
                <div className={style.indicadores}>
                    <span>
                        Disponíveis:
                        <strong className={style.disponiveis}>{salasDisponiveis}</strong>
                    </span>
                    <span className={style.separador}>|</span>
                    <span>
                        Ocupadas:
                        <strong className={style.ocupadas}>{salasOcupadas}</strong>
                    </span>
                </div>
            </Header>

            {/* Área de filtros */}
            <div className={style.filtros_container}>
                <div className={style.filtros}>
                    <label htmlFor="bloco">Filtro Bloco:</label>
                    <select
                        id="bloco"
                        value={filtroBloco}
                        onChange={(e) => setFiltroBloco(e.target.value)}
                    >
                        <option value="todos">Todos os Blocos</option>
                        <option value="A">Bloco A</option>
                        <option value="B">Bloco B</option>
                    </select>
                </div>

                <div className={style.filtros}>
                    <label htmlFor="CapacidadeMin">Min. capacidade</label>
                    <input
                        id="CapacidadeMin"
                        className={style.input_capacidade}
                        type="number"
                        placeholder="Capacidade mínima"
                        value={filtroCapacidade}
                        onChange={(e) => setFiltroCapacidade(Number(e.target.value))}
                    />
                </div>

                <div className={style.filtros}>
                    <label htmlFor="name">Buscar por nome:</label>
                    <input
                        id="name"
                        className={style.input_nome}
                        type="text"
                        placeholder="Buscar por nome da sala"
                        value={filtroNome}
                        onChange={(e) => setFiltroNome(e.target.value)}
                    />
                </div>
            </div>

            {/* Conteúdo principal */}
            <div className={style.dashboard_content}>
                <div className={style.cards_container}>
                    {salasFiltradas.length > 0 ? (
                        // Renderiza cada sala filtrada
                        salasFiltradas.map((sala) => (
                            <SalaCard
                                key={sala.id}
                                id={sala.id}
                                bloco={sala.bloco}
                                nome={sala.nome}
                                capacidade={sala.capacidade}
                                ocupada={sala.ocupada}
                            />
                        ))
                    ) : (
                        <p>Nenhuma sala encontrada com os filtros aplicados.</p>
                    )}
                </div>

                {/* Painel lateral com gráfico */}
                <div className={style.visual_panel}>
                    <h2>Análise Geral</h2>
                    <DonutChart
                        disponiveis={salasDisponiveis}
                        ocupadas={salasOcupadas}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
