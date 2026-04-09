import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient.js";

function App() {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState("painel");
  const [alunosLista, setAlunosLista] = useState([]);

  // Paleta de Cores ELFAedu
  const cores = {
    primaria: "#1E3A8A", // Azul Marinho
    secundaria: "#10B981", // Verde Sucesso
    fundo: "#F1F5F9",
    texto: "#1E293B",
    branco: "#FFFFFF",
    perigo: "#DC2626",
  };

  // 1. Atualiza o contador de registros no banco
  async function atualizarContagem() {
    try {
      const { count, error } = await supabase
        .from("alunos")
        .select("*", { count: "exact", head: true });
      if (!error) setTotal(count || 0);
    } catch (e) {
      console.error("Erro na conexão:", e);
    }
  }

  // 2. Busca os alunos mais recentes para a lista
  async function buscarAlunos() {
    const { data, error } = await supabase
      .from("alunos")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(8);
    if (!error) setAlunosLista(data);
  }

  useEffect(() => {
    atualizarContagem();
    buscarAlunos();
  }, []);

  // 3. Teste de Volume em Massa
  async function inserirMassa(qtd) {
    setLoading(true);
    const dados = [];
    const listaCursos = [
      "Técnico em Informática",
      "Técnico em Meio Ambiente",
      "Técnico em Moda",
      "Técnico em Costura Industrial",
    ];

    for (let i = 0; i < qtd; i++) {
      const idSorteio = Math.floor(Math.random() * 999999);
      dados.push({
        nome: `Estudante Simulado ${idSorteio}`,
        email: `aluno${idSorteio}@senai.mg.br`,
        curso: listaCursos[Math.floor(Math.random() * listaCursos.length)],
      });
    }

    const { error } = await supabase.from("alunos").insert(dados);

    if (error) {
      alert("Erro ao processar volume: " + error.message);
    } else {
      await atualizarContagem();
      await buscarAlunos();
    }
    setLoading(false);
  }

  // Estilos Reutilizáveis
  const estiloCard = {
    background: cores.branco,
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
    border: "1px solid #E2E8F0",
    flex: 1,
    minWidth: "300px",
  };

  const estiloBotaoAba = (id) => ({
    padding: "15px 30px",
    cursor: "pointer",
    border: "none",
    borderBottom:
      abaAtiva === id
        ? `4px solid ${cores.secundaria}`
        : "4px solid transparent",
    backgroundColor: "transparent",
    color: abaAtiva === id ? cores.primaria : "#64748B",
    fontWeight: "bold",
    fontSize: "1rem",
    transition: "0.2s",
  });

  return (
    <div
      style={{
        backgroundColor: cores.fundo,
        minHeight: "100vh",
        fontFamily: "'Segoe UI', Roboto, sans-serif",
        color: cores.texto,
      }}
    >
      {/* CABEÇALHO PRINCIPAL */}
      <header
        style={{
          backgroundColor: cores.primaria,
          padding: "30px 50px",
          color: "white",
          textAlign: "center",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "3.5rem",
            fontWeight: "800",
            letterSpacing: "-1px",
          }}
        >
          ELFA<span style={{ color: cores.secundaria }}>edu</span>
        </h1>
        <p
          style={{
            margin: "5px 0 0 0",
            fontSize: "1.1rem",
            fontWeight: "300",
            opacity: 0.9,
          }}
        >
          CONECTANDO CONHECIMENTO, GERANDO RESULTADOS
        </p>
      </header>

      {/* NAVEGAÇÃO POR ABAS */}
      <nav
        style={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <button
          onClick={() => setAbaAtiva("painel")}
          style={estiloBotaoAba("painel")}
        >
          PAINEL DE CONTROLE
        </button>
        <button
          onClick={() => setAbaAtiva("estudantes")}
          style={estiloBotaoAba("estudantes")}
        >
          LISTA DE ALUNOS
        </button>
        <button
          onClick={() => setAbaAtiva("volume")}
          style={estiloBotaoAba("volume")}
        >
          TESTE DE STRESS
        </button>
      </nav>

      <main style={{ padding: "50px", maxWidth: "1200px", margin: "0 auto" }}>
        {/* ABA: PAINEL DE CONTROLE */}
        {abaAtiva === "painel" && (
          <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
            <div style={estiloCard}>
              <h4
                style={{
                  margin: 0,
                  color: "#64748B",
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                }}
              >
                Total de Alunos na Base
              </h4>
              <h2
                style={{
                  fontSize: "70px",
                  margin: "10px 0",
                  color: cores.primaria,
                  fontWeight: "800",
                }}
              >
                {total.toLocaleString()}
              </h2>
              <p style={{ color: cores.secundaria, fontWeight: "bold" }}>
                ↑ Banco de Dados Otimizado
              </p>
            </div>

            <div style={estiloCard}>
              <h4
                style={{
                  margin: 0,
                  color: "#64748B",
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                }}
              >
                Status do Sistema
              </h4>
              <div style={{ marginTop: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: cores.secundaria,
                    }}
                  ></div>
                  <span>PostgreSQL (Supabase) Conectado</span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: cores.secundaria,
                    }}
                  ></div>
                  <span>Segurança RLS Ativa</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ABA: LISTA DE ALUNOS */}
        {abaAtiva === "estudantes" && (
          <div style={estiloCard}>
            <h3
              style={{
                borderBottom: "2px solid #F1F5F9",
                paddingBottom: "15px",
              }}
            >
              Alunos Recentemente Matriculados
            </h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "10px",
              }}
            >
              <thead>
                <tr
                  style={{
                    textAlign: "left",
                    color: "#64748B",
                    fontSize: "0.9rem",
                  }}
                >
                  <th style={{ padding: "15px" }}>NOME COMPLETO</th>
                  <th style={{ padding: "15px" }}>CURSO</th>
                  <th style={{ padding: "15px" }}>E-MAIL ACADÊMICO</th>
                </tr>
              </thead>
              <tbody>
                {alunosLista.map((aluno, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: "1px solid #F1F5F9",
                      hover: { backgroundColor: "#F8FAFC" },
                    }}
                  >
                    <td style={{ padding: "15px", fontWeight: "500" }}>
                      {aluno.nome}
                    </td>
                    <td style={{ padding: "15px" }}>
                      <span
                        style={{
                          backgroundColor: "#E0F2FE",
                          color: "#0369A1",
                          padding: "5px 12px",
                          borderRadius: "20px",
                          fontSize: "0.85rem",
                          fontWeight: "600",
                        }}
                      >
                        {aluno.curso}
                      </span>
                    </td>
                    <td style={{ padding: "15px", color: "#64748B" }}>
                      {aluno.email}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ABA: TESTE DE VOLUME (STRESS) */}
        {abaAtiva === "volume" && (
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <div style={{ ...estiloCard, textAlign: "center" }}>
              <h2 style={{ color: cores.perigo, fontSize: "2rem" }}>
                Simulador de Alta Volumetria
              </h2>
              <p style={{ color: "#64748B", marginBottom: "30px" }}>
                Esta ferramenta insere milhares de registros simultâneos para
                testar a escalabilidade do banco de dados e a eficiência das
                políticas de segurança.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <button
                  disabled={loading}
                  onClick={() => inserirMassa(100)}
                  style={{
                    padding: "20px",
                    borderRadius: "12px",
                    border: "none",
                    backgroundColor: cores.primaria,
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                >
                  {loading ? "PROCESSANDO..." : "INSERIR +100 REGISTROS"}
                </button>

                <button
                  disabled={loading}
                  onClick={() => inserirMassa(1000)}
                  style={{
                    padding: "20px",
                    borderRadius: "12px",
                    border: "none",
                    backgroundColor: cores.perigo,
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                >
                  {loading
                    ? "PROCESSANDO..."
                    : "TESTE DE CARGA EXTREMA (+1.000)"}
                </button>
              </div>
              {loading && (
                <p
                  style={{
                    marginTop: "20px",
                    color: cores.primaria,
                    fontWeight: "bold",
                  }}
                >
                  Aguarde... Comunicando com o servidor Postgres...
                </p>
              )}
            </div>
          </div>
        )}
      </main>

      <footer
        style={{
          textAlign: "center",
          padding: "60px 20px",
          color: "#94A3B8",
          fontSize: "0.9rem",
        }}
      >
        <p>
          <strong>ELFAedu</strong> - Sistema de Gestão Educacional Avançada
        </p>
        <p>
          Muriaé, MG | SENAI - 2026 | Desenvolvido para Testes de Performance
        </p>
      </footer>
    </div>
  );
}

export default App;
