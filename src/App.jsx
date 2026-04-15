import React, { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "./supabaseClient.js";

const SENHA_ADMIN = "admin123";

// 50 nomes reais brasileiros distribuídos nos 4 cursos
const ALUNOS_REAIS = [
  {
    nome: "Ana Paula Ferreira",
    email: "ana.ferreira@email.com",
    curso: "Técnico em Informática",
  },
  {
    nome: "Bruno Henrique Lima",
    email: "bruno.lima@email.com",
    curso: "Corte e Costura Industrial",
  },
  {
    nome: "Camila Souza Mendes",
    email: "camila.mendes@email.com",
    curso: "Design de Moda",
  },
  {
    nome: "Diego Martins Rocha",
    email: "diego.rocha@email.com",
    curso: "Logística Industrial",
  },
  {
    nome: "Eliane Costa Pereira",
    email: "eliane.pereira@email.com",
    curso: "Técnico em Informática",
  },
  {
    nome: "Felipe Andrade Santos",
    email: "felipe.santos@email.com",
    curso: "Corte e Costura Industrial",
  },
  {
    nome: "Gabriela Oliveira Silva",
    email: "gabriela.silva@email.com",
    curso: "Design de Moda",
  },
  {
    nome: "Henrique Carvalho Neto",
    email: "henrique.neto@email.com",
    curso: "Logística Industrial",
  },
  {
    nome: "Isabela Rodrigues Melo",
    email: "isabela.melo@email.com",
    curso: "Técnico em Informática",
  },
  {
    nome: "João Victor Alves",
    email: "joao.alves@email.com",
    curso: "Corte e Costura Industrial",
  },
  {
    nome: "Karina Nascimento Cruz",
    email: "karina.cruz@email.com",
    curso: "Design de Moda",
  },
  {
    nome: "Lucas Fernandes Gomes",
    email: "lucas.gomes@email.com",
    curso: "Logística Industrial",
  },
  {
    nome: "Mariana Pinto Azevedo",
    email: "mariana.azevedo@email.com",
    curso: "Técnico em Informática",
  },
  {
    nome: "Nicolas Barbosa Torres",
    email: "nicolas.torres@email.com",
    curso: "Corte e Costura Industrial",
  },
  {
    nome: "Olivia Freitas Cardoso",
    email: "olivia.cardoso@email.com",
    curso: "Design de Moda",
  },
  {
    nome: "Pedro Henrique Moreira",
    email: "pedro.moreira@email.com",
    curso: "Logística Industrial",
  },
  {
    nome: "Rafaela Cunha Vieira",
    email: "rafaela.vieira@email.com",
    curso: "Técnico em Informática",
  },
  {
    nome: "Samuel Ribeiro Campos",
    email: "samuel.campos@email.com",
    curso: "Corte e Costura Industrial",
  },
  {
    nome: "Tatiane Lopes Sousa",
    email: "tatiane.sousa@email.com",
    curso: "Design de Moda",
  },
  {
    nome: "Ulisses Correia Farias",
    email: "ulisses.farias@email.com",
    curso: "Logística Industrial",
  },
  {
    nome: "Vanessa Batista Duarte",
    email: "vanessa.duarte@email.com",
    curso: "Técnico em Informática",
  },
  {
    nome: "Wagner Cavalcante Reis",
    email: "wagner.reis@email.com",
    curso: "Corte e Costura Industrial",
  },
  {
    nome: "Xiomara Fonseca Lima",
    email: "xiomara.lima@email.com",
    curso: "Design de Moda",
  },
  {
    nome: "Yago Macedo Braga",
    email: "yago.braga@email.com",
    curso: "Logística Industrial",
  },
  {
    nome: "Zara Teixeira Nogueira",
    email: "zara.nogueira@email.com",
    curso: "Técnico em Informática",
  },
  {
    nome: "André Luiz Pinheiro",
    email: "andre.pinheiro@email.com",
    curso: "Corte e Costura Industrial",
  },
  {
    nome: "Beatriz Monteiro Saraiva",
    email: "beatriz.saraiva@email.com",
    curso: "Design de Moda",
  },
  {
    nome: "Carlos Eduardo Maciel",
    email: "carlos.maciel@email.com",
    curso: "Logística Industrial",
  },
  {
    nome: "Daniela Quaresma Paiva",
    email: "daniela.paiva@email.com",
    curso: "Técnico em Informática",
  },
  {
    nome: "Eduardo Vasconcelos Sá",
    email: "eduardo.sa@email.com",
    curso: "Corte e Costura Industrial",
  },
  {
    nome: "Fernanda Lacerda Queiroz",
    email: "fernanda.queiroz@email.com",
    curso: "Design de Moda",
  },
  {
    nome: "Gustavo Amorim Leite",
    email: "gustavo.leite@email.com",
    curso: "Logística Industrial",
  },
  {
    nome: "Helena Borges Esteves",
    email: "helena.esteves@email.com",
    curso: "Técnico em Informática",
  },
  {
    nome: "Igor Santana Medeiros",
    email: "igor.medeiros@email.com",
    curso: "Corte e Costura Industrial",
  },
  {
    nome: "Julia Abreu Nunes",
    email: "julia.nunes@email.com",
    curso: "Design de Moda",
  },
  {
    nome: "Kevin Mota Silveira",
    email: "kevin.silveira@email.com",
    curso: "Logística Industrial",
  },
  {
    nome: "Larissa Couto Rangel",
    email: "larissa.rangel@email.com",
    curso: "Técnico em Informática",
  },
  {
    nome: "Matheus Dias Ramos",
    email: "matheus.ramos@email.com",
    curso: "Corte e Costura Industrial",
  },
  {
    nome: "Natalia Guedes Falcão",
    email: "natalia.falcao@email.com",
    curso: "Design de Moda",
  },
  {
    nome: "Otávio Leal Magalhães",
    email: "otavio.magalhaes@email.com",
    curso: "Logística Industrial",
  },
  {
    nome: "Priscila Tavares Muniz",
    email: "priscila.muniz@email.com",
    curso: "Técnico em Informática",
  },
  {
    nome: "Renata Xavier Castello",
    email: "renata.castello@email.com",
    curso: "Corte e Costura Industrial",
  },
  {
    nome: "Sérgio Bastos Valente",
    email: "sergio.valente@email.com",
    curso: "Design de Moda",
  },
  {
    nome: "Thainá Aguiar Pompeu",
    email: "thaina.pompeu@email.com",
    curso: "Logística Industrial",
  },
  {
    nome: "Uanderson Rios Bentes",
    email: "uanderson.bentes@email.com",
    curso: "Técnico em Informática",
  },
  {
    nome: "Victória Almada Pessoa",
    email: "victoria.pessoa@email.com",
    curso: "Corte e Costura Industrial",
  },
  {
    nome: "Willian Cerqueira Hugo",
    email: "willian.hugo@email.com",
    curso: "Design de Moda",
  },
  {
    nome: "Xênia Brandão Salles",
    email: "xenia.salles@email.com",
    curso: "Logística Industrial",
  },
  {
    nome: "Yasmin Trindade Costa",
    email: "yasmin.costa@email.com",
    curso: "Técnico em Informática",
  },
  {
    nome: "Zoé Parreiras Valim",
    email: "zoe.valim@email.com",
    curso: "Corte e Costura Industrial",
  },
];

function App() {
  const [abaAtiva, setAbaAtiva] = useState("home");
  const [alunos, setAlunos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Formulário de inscrição
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cursoSel, setCursoSel] = useState("");

  // Último registro inserido (cláusula de arrependimento)
  const [ultimoInserido, setUltimoInserido] = useState(null);
  const [tempoArrependimento, setTempoArrependimento] = useState(0);
  const timerRef = useRef(null);

  // Admin — controle de visualização
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [buscaTermo, setBuscaTermo] = useState("");
  const [buscaResultados, setBuscaResultados] = useState([]);
  const [buscando, setBuscando] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const ITENS_POR_PAGINA = 20;

  // Teste de volume
  const [logs, setLogs] = useState([]);
  const [metricas, setMetricas] = useState([]);
  const [testando, setTestando] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const logsRef = useRef(null);

  useEffect(() => {
    consultarCursos();
    consultarBanco();
  }, []);

  useEffect(() => {
    if (logsRef.current) {
      logsRef.current.scrollTop = logsRef.current.scrollHeight;
    }
  }, [logs]);

  // Timer de arrependimento (30 segundos)
  useEffect(() => {
    if (ultimoInserido) {
      setTempoArrependimento(30);
      timerRef.current = setInterval(() => {
        setTempoArrependimento((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            setUltimoInserido(null);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [ultimoInserido]);

  function adicionarLog(msg, tipo = "info") {
    const hora = new Date().toLocaleTimeString("pt-BR");
    setLogs((prev) => [...prev, { hora, msg, tipo }]);
  }

  async function consultarCursos() {
    const { data } = await supabase
      .from("cursos_oficiais")
      .select("*")
      .order("nome_curso");
    if (data) {
      setCursos(data);
      if (data.length > 0) setCursoSel(data[0].nome_curso);
    }
  }

  async function consultarBanco(pagina = 1, todos = false) {
    if (todos) {
      const inicio = (pagina - 1) * ITENS_POR_PAGINA;
      const { data, count } = await supabase
        .from("alunos")
        .select("*", { count: "exact" })
        .order("id_aluno", { ascending: false })
        .range(inicio, inicio + ITENS_POR_PAGINA - 1);
      if (data) {
        setAlunos(data);
        setTotal(count || 0);
        setTotalPaginas(Math.ceil((count || 0) / ITENS_POR_PAGINA));
      }
    } else {
      const { data, count } = await supabase
        .from("alunos")
        .select("*", { count: "exact" })
        .order("id_aluno", { ascending: false })
        .limit(10);
      if (data) {
        setAlunos(data);
        setTotal(count || 0);
      }
    }
  }

  async function buscarAlunos(termo) {
    if (!termo.trim()) {
      setBuscaResultados([]);
      return;
    }
    setBuscando(true);
    const isNumero = /^\d+$/.test(termo.trim());
    let query;
    if (isNumero) {
      query = supabase
        .from("alunos")
        .select("*")
        .eq("id_aluno", Number(termo.trim()));
    } else {
      query = supabase
        .from("alunos")
        .select("*")
        .ilike("nome", `%${termo.trim()}%`)
        .limit(30);
    }
    const { data } = await query;
    setBuscaResultados(data || []);
    setBuscando(false);
  }

  async function cadastrar(e) {
    e.preventDefault();
    if (!nome || !email) return alert("Preencha nome e e-mail!");
    setLoading(true);
    const { error, data } = await supabase
      .from("alunos")
      .insert([{ nome, email, curso: cursoSel }])
      .select()
      .single();
    if (!error && data) {
      setUltimoInserido(data);
      setNome("");
      setEmail("");
      consultarBanco();
      alert("Inscrição ELFAedu realizada com sucesso!");
    } else {
      alert("Erro ao cadastrar: " + error.message);
    }
    setLoading(false);
  }

  async function cancelarInscricao() {
    if (!ultimoInserido) return;
    const confirmado = window.confirm(
      `Deseja cancelar a inscrição de "${ultimoInserido.nome}"?\nEsta ação não pode ser desfeita.`,
    );
    if (!confirmado) return;
    clearInterval(timerRef.current);
    await supabase
      .from("alunos")
      .delete()
      .eq("id_aluno", ultimoInserido.id_aluno);
    setUltimoInserido(null);
    setTempoArrependimento(0);
    consultarBanco();
    alert("Inscrição cancelada com sucesso.");
  }

  async function excluirComSenha(id, nome) {
    const senha = prompt(`Senha do Administrador para remover "${nome}":`);
    if (senha === SENHA_ADMIN) {
      await supabase.from("alunos").delete().eq("id_aluno", id);
      consultarBanco(paginaAtual, mostrarTodos);
      if (buscaTermo) buscarAlunos(buscaTermo);
    } else if (senha !== null) {
      alert("Senha incorreta.");
    }
  }

  async function popularAlunosReais() {
    const senha = prompt("Senha do Administrador para popular alunos reais:");
    if (senha !== SENHA_ADMIN) {
      if (senha !== null) alert("Senha incorreta.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("alunos").insert(ALUNOS_REAIS);
    if (!error) {
      alert(`${ALUNOS_REAIS.length} alunos reais cadastrados com sucesso!`);
      consultarBanco();
    } else {
      alert("Erro: " + error.message);
    }
    setLoading(false);
  }

  async function mudarPagina(novaPagina) {
    setPaginaAtual(novaPagina);
    await consultarBanco(novaPagina, true);
  }

  async function toggleMostrarTodos() {
    const novoEstado = !mostrarTodos;
    setMostrarTodos(novoEstado);
    setPaginaAtual(1);
    await consultarBanco(1, novoEstado);
  }

  // ─── Teste de Volume ───────────────────────────────────────────
  async function executarTesteVolume(qtdTotal) {
    setTestando(true);
    setProgresso(0);
    setLogs([]);
    setMetricas([]);
    const LOTE = 100;
    const totalLotes = Math.ceil(qtdTotal / LOTE);
    const resultados = [];
    adicionarLog(`🚀 Iniciando teste com ${qtdTotal} registros...`, "info");
    adicionarLog(
      `📦 Estratégia: ${totalLotes} lote(s) de até ${LOTE} registros`,
      "info",
    );
    const inicioGeral = performance.now();
    for (let lote = 0; lote < totalLotes; lote++) {
      const tamanhoLote = Math.min(LOTE, qtdTotal - lote * LOTE);
      const cursoAleatorio =
        cursos[Math.floor(Math.random() * cursos.length)]?.nome_curso ||
        "Técnico em Informática";
      const carga = Array.from({ length: tamanhoLote }).map((_, i) => ({
        nome: `Aluno Teste ${lote * LOTE + i + 1}`,
        email: `teste${lote * LOTE + i + 1}@elfaedu.com.br`,
        curso: cursoAleatorio,
      }));
      const inicio = performance.now();
      const { error } = await supabase.from("alunos").insert(carga).select();
      const fim = performance.now();
      const duracao = (fim - inicio).toFixed(0);
      if (error) {
        adicionarLog(`❌ Erro no lote ${lote + 1}: ${error.message}`, "erro");
        break;
      }
      resultados.push({
        lote: lote + 1,
        registros: tamanhoLote,
        ms: Number(duracao),
      });
      const pct = Math.round(((lote + 1) / totalLotes) * 100);
      setProgresso(pct);
      adicionarLog(
        `✅ Lote ${lote + 1}/${totalLotes} — ${tamanhoLote} registros em ${duracao}ms`,
        "sucesso",
      );
      await new Promise((r) => setTimeout(r, 50));
    }
    const fimGeral = performance.now();
    const totalMs = (fimGeral - inicioGeral).toFixed(0);
    const mediaMs = resultados.length
      ? (resultados.reduce((a, b) => a + b.ms, 0) / resultados.length).toFixed(
          0,
        )
      : 0;
    const menorMs = resultados.length
      ? Math.min(...resultados.map((r) => r.ms))
      : 0;
    const maiorMs = resultados.length
      ? Math.max(...resultados.map((r) => r.ms))
      : 0;
    adicionarLog("─".repeat(48), "divisor");
    adicionarLog(
      `⏱️  Tempo total: ${totalMs}ms (${(totalMs / 1000).toFixed(2)}s)`,
      "info",
    );
    adicionarLog(`📊 Média por lote: ${mediaMs}ms`, "info");
    adicionarLog(`⚡ Lote mais rápido: ${menorMs}ms`, "sucesso");
    adicionarLog(`🐢 Lote mais lento: ${maiorMs}ms`, "aviso");
    adicionarLog(`🎯 Total inserido: ${qtdTotal} registros`, "sucesso");
    setMetricas([
      { label: "Total inserido", valor: qtdTotal, cor: "#38bdf8" },
      {
        label: "Tempo total",
        valor: `${(totalMs / 1000).toFixed(2)}s`,
        cor: "#22c55e",
      },
      { label: "Média/lote", valor: `${mediaMs}ms`, cor: "#facc15" },
      { label: "Lotes enviados", valor: totalLotes, cor: "#a78bfa" },
    ]);
    await consultarBanco();
    setTestando(false);
    adicionarLog("✔️  Banco de dados atualizado com sucesso!", "sucesso");
  }

  async function limparDadosTeste() {
    const senha = prompt("Senha do Administrador para limpar dados de teste:");
    if (senha !== SENHA_ADMIN) {
      if (senha !== null) alert("Senha incorreta.");
      return;
    }
    setTestando(true);
    adicionarLog("🗑️  Removendo registros de teste...", "aviso");
    const inicio = performance.now();
    const { error } = await supabase
      .from("alunos")
      .delete({ count: "exact" })
      .like("email", "%@elfaedu.com.br");
    const fim = performance.now();
    if (!error) {
      adicionarLog(
        `✅ Limpeza concluída em ${(fim - inicio).toFixed(0)}ms`,
        "sucesso",
      );
      await consultarBanco();
    } else {
      adicionarLog(`❌ Erro na limpeza: ${error.message}`, "erro");
    }
    setTestando(false);
  }

  // ─── Estilos ──────────────────────────────────────────────────
  const estiloSidebar = {
    width: "260px",
    background: "#1e293b",
    padding: "28px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    borderRight: "1px solid #334155",
    position: "fixed",
    height: "100vh",
    overflowY: "auto",
  };

  const estiloBotaoMenu = (id) => ({
    padding: "14px 16px",
    textAlign: "left",
    background: abaAtiva === id ? "#38bdf8" : "transparent",
    color: abaAtiva === id ? "#0f172a" : "#f1f5f9",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: abaAtiva === id ? "bold" : "normal",
    fontSize: "14px",
    transition: "background 0.2s",
  });

  const estiloInput = {
    padding: "13px 15px",
    borderRadius: "8px",
    border: "1px solid #334155",
    backgroundColor: "#f8fafc",
    color: "#1e293b",
    fontSize: "15px",
  };

  const estiloCard = (cor = "#334155") => ({
    background: "#1e293b",
    border: `1px solid ${cor}`,
    borderRadius: "16px",
    padding: "24px",
  });

  const corLog = {
    info: "#94a3b8",
    sucesso: "#4ade80",
    erro: "#f87171",
    aviso: "#fbbf24",
    divisor: "#475569",
  };

  const listaExibida = buscaTermo.trim() ? buscaResultados : alunos;

  // ─── Render ───────────────────────────────────────────────────
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "#f1f5f9",
        fontFamily: "Inter, 'Segoe UI', sans-serif",
      }}
    >
      {/* SIDEBAR */}
      <nav style={estiloSidebar}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1
            style={{
              color: "#38bdf8",
              margin: 0,
              fontSize: "2rem",
              letterSpacing: "-1px",
            }}
          >
            <img src="/logo.png" alt="Logo" />
          </h1>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "11px",
              marginTop: "4px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Excelência em Ensino Técnico
          </p>
        </div>
        {[
          { id: "home", label: "🚀 Quero me Inscrever" },
          { id: "volume", label: "📈 Teste de Volume" },
          { id: "admin", label: "⚙️ Gestão de Dados" },
          { id: "sobre", label: "📖 Nossa História" },
          { id: "galeria", label: "🖼️ Galeria ELFA" },
          { id: "feedback", label: "💬 Depoimentos" },
            
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setAbaAtiva(id)}
            style={estiloBotaoMenu(id)}
          >
            {label}
          </button>
        ))}
        <div
          style={{
            marginTop: "auto",
            paddingTop: "20px",
            borderTop: "1px solid #334155",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "11px", color: "#64748b" }}>Total no banco</p>
          <p
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#38bdf8",
              margin: "2px 0",
            }}
          >
            {total}
          </p>
          <p style={{ fontSize: "11px", color: "#64748b" }}>registros</p>
        </div>
      </nav>

      {/* CONTEÚDO PRINCIPAL */}
      <main
        style={{
          flex: 1,
          marginLeft: "260px",
          padding: "40px 50px",
          overflowY: "auto",
        }}
      >
        {/* ── ABA HOME ── */}
        {abaAtiva === "home" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <h1
                style={{
                  fontSize: "2.4rem",
                  color: "#38bdf8",
                  marginBottom: "8px",
                }}
              >
                Construa seu Futuro Profissional
              </h1>
              <p style={{ fontSize: "1.1rem", color: "#94a3b8" }}>
                A decisão que transforma você em um especialista de renome.
              </p>
            </div>

            {/* Banner de arrependimento */}
            {ultimoInserido && (
              <div
                style={{
                  background: "#1c1f26",
                  border: "2px solid #f59e0b",
                  borderRadius: "14px",
                  padding: "20px 24px",
                  marginBottom: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "20px",
                }}
              >
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: "bold",
                      color: "#fbbf24",
                      fontSize: "15px",
                    }}
                  >
                    ⏳ Cláusula de Arrependimento — {tempoArrependimento}s
                    restantes
                  </p>
                  <p
                    style={{
                      margin: "4px 0 0",
                      color: "#94a3b8",
                      fontSize: "13px",
                    }}
                  >
                    Inscrição de{" "}
                    <strong style={{ color: "#f1f5f9" }}>
                      {ultimoInserido.nome}
                    </strong>{" "}
                    registrada no curso{" "}
                    <strong style={{ color: "#38bdf8" }}>
                      {ultimoInserido.curso}
                    </strong>
                    .
                  </p>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      border: "3px solid #f59e0b",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#fbbf24",
                      flexShrink: 0,
                    }}
                  >
                    {tempoArrependimento}
                  </div>
                  <button
                    onClick={cancelarInscricao}
                    style={{
                      background: "#7f1d1d",
                      color: "#fca5a5",
                      border: "1px solid #b91c1c",
                      borderRadius: "10px",
                      padding: "10px 20px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "13px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    ✕ Cancelar Inscrição
                  </button>
                </div>
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr",
                gap: "40px",
                alignItems: "start",
              }}
            >
              <section
                style={{
                  background: "#1e293b",
                  padding: "36px",
                  borderRadius: "20px",
                  border: "1px solid #334155",
                }}
              >
                <h3
                  style={{
                    marginBottom: "24px",
                    fontSize: "1.3rem",
                    color: "#38bdf8",
                  }}
                >
                  Ficha de Inscrição
                </h3>
                <form
                  onSubmit={cadastrar}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "18px",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <span style={{ color: "#94a3b8", fontSize: "13px" }}>
                      Nome Completo
                    </span>
                    <input
                      placeholder="Ex: Maria Oliveira"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      style={estiloInput}
                    />
                  </label>
                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <span style={{ color: "#94a3b8", fontSize: "13px" }}>
                      E-mail
                    </span>
                    <input
                      placeholder="Ex: contato@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={estiloInput}
                    />
                  </label>
                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <span style={{ color: "#94a3b8", fontSize: "13px" }}>
                      Escolha seu Curso
                    </span>
                    <select
                      value={cursoSel}
                      onChange={(e) => setCursoSel(e.target.value)}
                      style={estiloInput}
                    >
                      {cursos.map((c) => (
                        <option key={c.id_serial} value={c.nome_curso}>
                          {c.nome_curso}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      background: "#22c55e",
                      color: "#fff",
                      padding: "16px",
                      border: "none",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      fontSize: "16px",
                      cursor: "pointer",
                      marginTop: "8px",
                    }}
                  >
                    {loading ? "PROCESSANDO..." : "GARANTIR MINHA VAGA"}
                  </button>
                </form>
              </section>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    background: "linear-gradient(135deg, #2563eb, #38bdf8)",
                    padding: "28px",
                    borderRadius: "20px",
                    textAlign: "center",
                  }}
                >
                  <h4 style={{ margin: 0, opacity: 0.9, fontSize: "14px" }}>
                    Alunos já conectados
                  </h4>
                  <h2
                    style={{
                      fontSize: "3.5rem",
                      margin: "10px 0",
                      fontWeight: "bold",
                    }}
                  >
                    {total}
                  </h2>
                  <p style={{ margin: 0, fontSize: "13px" }}>
                    Faça parte desta comunidade técnica!
                  </p>
                </div>
                <div
                  style={{
                    background: "#1e293b",
                    padding: "22px",
                    borderRadius: "20px",
                    border: "1px solid #334155",
                  }}
                >
                  <h4
                    style={{
                      color: "#38bdf8",
                      marginTop: 0,
                      marginBottom: "10px",
                    }}
                  >
                    Destaques do Mercado
                  </h4>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "1.7",
                      color: "#94a3b8",
                    }}
                  >
                    O mercado de Muriaé e região busca profissionais
                    qualificados pela ELFAedu. 90% dos nossos alunos saem
                    empregados.
                  </p>
                </div>
                {/* Botão popular alunos reais */}
                <button
                  onClick={popularAlunosReais}
                  disabled={loading}
                  style={{
                    background: "#1e293b",
                    color: "#a78bfa",
                    border: "1px dashed #6d28d9",
                    borderRadius: "12px",
                    padding: "14px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "bold",
                  }}
                >
                  👤 Popular 50 Alunos Reais (Demo)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── ABA TESTE DE VOLUME ── */}
        {abaAtiva === "volume" && (
          <div>
            <div style={{ marginBottom: "32px" }}>
              <h1
                style={{
                  color: "#facc15",
                  fontSize: "2rem",
                  marginBottom: "6px",
                }}
              >
                📈 Painel de Teste de Volume
              </h1>
              <p style={{ color: "#94a3b8", fontSize: "14px" }}>
                Demonstração de inserção em lote (batch insert) com
                monitoramento de performance em tempo real.
              </p>
            </div>
            {metricas.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "16px",
                  marginBottom: "28px",
                }}
              >
                {metricas.map((m) => (
                  <div
                    key={m.label}
                    style={{
                      background: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "14px",
                      padding: "20px",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        color: "#64748b",
                        fontSize: "12px",
                        margin: "0 0 6px",
                      }}
                    >
                      {m.label}
                    </p>
                    <p
                      style={{
                        color: m.cor,
                        fontSize: "2rem",
                        fontWeight: "bold",
                        margin: 0,
                      }}
                    >
                      {m.valor}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {testando && (
              <div style={{ marginBottom: "24px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "13px",
                    color: "#94a3b8",
                    marginBottom: "6px",
                  }}
                >
                  <span>Progresso da inserção</span>
                  <span>{progresso}%</span>
                </div>
                <div
                  style={{
                    height: "10px",
                    background: "#1e293b",
                    borderRadius: "10px",
                    overflow: "hidden",
                    border: "1px solid #334155",
                  }}
                >
                  <div
                    style={{
                      width: `${progresso}%`,
                      height: "100%",
                      background: "linear-gradient(90deg, #38bdf8, #22c55e)",
                      borderRadius: "10px",
                      transition: "width 0.3s",
                    }}
                  />
                </div>
              </div>
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
                marginBottom: "24px",
              }}
            >
              <div style={estiloCard("#334155")}>
                <h3
                  style={{
                    color: "#38bdf8",
                    marginTop: 0,
                    marginBottom: "8px",
                  }}
                >
                  Inserção em Lote
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#94a3b8",
                    marginBottom: "20px",
                    lineHeight: "1.6",
                  }}
                >
                  Insere registros em lotes de 100, medindo o tempo de cada
                  operação.
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {[
                    {
                      qtd: 100,
                      label: "INSERIR 100 REGISTROS",
                      cor: "#3b82f6",
                    },
                    {
                      qtd: 500,
                      label: "INSERIR 500 REGISTROS",
                      cor: "#f59e0b",
                    },
                    {
                      qtd: 1000,
                      label: "INSERIR 1.000 REGISTROS",
                      cor: "#ef4444",
                    },
                  ].map(({ qtd, label, cor }) => (
                    <button
                      key={qtd}
                      onClick={() => executarTesteVolume(qtd)}
                      disabled={testando}
                      style={{
                        background: testando ? "#1e293b" : cor,
                        color: testando ? "#475569" : "white",
                        padding: "14px",
                        borderRadius: "10px",
                        border: testando ? "1px solid #334155" : "none",
                        cursor: testando ? "not-allowed" : "pointer",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      {testando ? "⏳ AGUARDE..." : label}
                    </button>
                  ))}
                </div>
              </div>
              <div style={estiloCard("#7f1d1d")}>
                <h3
                  style={{
                    color: "#f87171",
                    marginTop: 0,
                    marginBottom: "8px",
                  }}
                >
                  Limpeza de Dados
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#94a3b8",
                    marginBottom: "20px",
                    lineHeight: "1.6",
                  }}
                >
                  Remove todos os registros gerados pelo teste (
                  <code style={{ color: "#f87171" }}>@elfaedu.com.br</code>).
                </p>
                <button
                  onClick={limparDadosTeste}
                  disabled={testando}
                  style={{
                    width: "100%",
                    background: testando ? "#1e293b" : "#7f1d1d",
                    color: testando ? "#475569" : "#fca5a5",
                    padding: "14px",
                    borderRadius: "10px",
                    border: "1px solid #b91c1c",
                    cursor: testando ? "not-allowed" : "pointer",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  🗑️ LIMPAR DADOS DE TESTE
                </button>
                <div
                  style={{
                    marginTop: "20px",
                    padding: "14px",
                    background: "#0f172a",
                    borderRadius: "10px",
                    border: "1px solid #334155",
                  }}
                >
                  <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>
                    Registros reais no banco
                  </p>
                  <p
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: "bold",
                      color: "#22c55e",
                      margin: "4px 0 0",
                    }}
                  >
                    {total}
                  </p>
                </div>
              </div>
            </div>
            <div style={estiloCard("#334155")}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <h3
                  style={{
                    color: "#94a3b8",
                    margin: 0,
                    fontSize: "14px",
                    fontFamily: "monospace",
                  }}
                >
                  ▶ Terminal de Execução
                </h3>
                {logs.length > 0 && (
                  <button
                    onClick={() => setLogs([])}
                    style={{
                      background: "none",
                      border: "1px solid #334155",
                      color: "#64748b",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    limpar
                  </button>
                )}
              </div>
              <div
                ref={logsRef}
                style={{
                  background: "#020617",
                  borderRadius: "10px",
                  padding: "16px",
                  height: "260px",
                  overflowY: "auto",
                  fontFamily: "monospace",
                  fontSize: "13px",
                  lineHeight: "1.8",
                }}
              >
                {logs.length === 0 ? (
                  <p style={{ color: "#334155", margin: 0 }}>
                    Aguardando execução do teste...
                  </p>
                ) : (
                  logs.map((l, i) => (
                    <div
                      key={i}
                      style={{
                        color:
                          l.tipo === "divisor" ? "#334155" : corLog[l.tipo],
                      }}
                    >
                      {l.tipo !== "divisor" && (
                        <span style={{ color: "#334155", marginRight: "10px" }}>
                          [{l.hora}]
                        </span>
                      )}
                      {l.msg}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── ABA ADMIN ── */}
        {abaAtiva === "admin" && (
          <div>
            <h1 style={{ color: "#facc15", marginBottom: "28px" }}>
              ⚙️ Gestão de Dados
            </h1>

            {/* Cards de métricas */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
                marginBottom: "36px",
              }}
            >
              {[
                { label: "Registros no Banco", valor: total, cor: "#38bdf8" },
                {
                  label: "Cursos na Grade",
                  valor: cursos.length,
                  cor: "#22c55e",
                },
                {
                  label: "Índice de Aprovação",
                  valor: "98.2%",
                  cor: "#facc15",
                },
              ].map((c) => (
                <div
                  key={c.label}
                  style={{
                    background: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "16px",
                    padding: "22px",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      color: "#64748b",
                      fontSize: "13px",
                      margin: "0 0 6px",
                    }}
                  >
                    {c.label}
                  </p>
                  <h2 style={{ color: c.cor, fontSize: "2.5rem", margin: 0 }}>
                    {c.valor}
                  </h2>
                </div>
              ))}
            </div>

            {/* ── CAMPO DE BUSCA ── */}
            <div
              style={{
                background: "#1e293b",
                padding: "24px",
                borderRadius: "16px",
                border: "1px solid #334155",
                marginBottom: "24px",
              }}
            >
              <h3
                style={{
                  color: "#38bdf8",
                  marginTop: 0,
                  marginBottom: "14px",
                  fontSize: "1rem",
                }}
              >
                🔍 Pesquisar Aluno
              </h3>
              <div
                style={{ display: "flex", gap: "12px", alignItems: "center" }}
              >
                <input
                  placeholder="Buscar por nome ou nº de matrícula..."
                  value={buscaTermo}
                  onChange={(e) => {
                    setBuscaTermo(e.target.value);
                    buscarAlunos(e.target.value);
                  }}
                  style={{ ...estiloInput, flex: 1 }}
                />
                {buscaTermo && (
                  <button
                    onClick={() => {
                      setBuscaTermo("");
                      setBuscaResultados([]);
                    }}
                    style={{
                      background: "#334155",
                      color: "#94a3b8",
                      border: "none",
                      borderRadius: "8px",
                      padding: "13px 18px",
                      cursor: "pointer",
                      fontSize: "13px",
                    }}
                  >
                    ✕ Limpar
                  </button>
                )}
              </div>
              {buscaTermo && (
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "12px",
                    marginTop: "10px",
                    marginBottom: 0,
                  }}
                >
                  {buscando
                    ? "Buscando..."
                    : `${buscaResultados.length} resultado(s) encontrado(s)`}
                </p>
              )}
            </div>

            {/* ── LISTA DE ALUNOS ── */}
            <div
              style={{
                background: "#1e293b",
                padding: "24px",
                borderRadius: "20px",
                border: "1px solid #334155",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <h4 style={{ margin: 0, fontSize: "1rem" }}>
                  {buscaTermo
                    ? `Resultados da busca por "${buscaTermo}"`
                    : mostrarTodos
                      ? `Todos os registros (Página ${paginaAtual}/${totalPaginas})`
                      : "Últimos 10 registros — Auditoria e Exclusão"}
                </h4>
                {!buscaTermo && (
                  <button
                    onClick={toggleMostrarTodos}
                    style={{
                      background: mostrarTodos ? "#334155" : "#0f172a",
                      color: mostrarTodos ? "#f1f5f9" : "#38bdf8",
                      border: `1px solid ${mostrarTodos ? "#475569" : "#38bdf8"}`,
                      borderRadius: "8px",
                      padding: "8px 16px",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                  >
                    {mostrarTodos
                      ? "📋 Ver apenas últimos 10"
                      : `📂 Ver todos (${total})`}
                  </button>
                )}
              </div>

              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "14px",
                  }}
                >
                  <thead>
                    <tr style={{ borderBottom: "2px solid #334155" }}>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "10px 12px",
                          color: "#64748b",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        MATRÍCULA
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "10px 12px",
                          color: "#64748b",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        NOME
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "10px 12px",
                          color: "#64748b",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        E-MAIL
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "10px 12px",
                          color: "#64748b",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        CURSO
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          padding: "10px 12px",
                          color: "#64748b",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        AÇÃO
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listaExibida.map((a) => (
                      <tr
                        key={a.id_aluno}
                        style={{ borderBottom: "1px solid #1e3a5f" }}
                      >
                        <td
                          style={{
                            padding: "12px",
                            color: "#38bdf8",
                            fontWeight: "bold",
                            fontFamily: "monospace",
                          }}
                        >
                          #{a.id_aluno}
                        </td>
                        <td style={{ padding: "12px" }}>{a.nome}</td>
                        <td
                          style={{
                            padding: "12px",
                            color: "#94a3b8",
                            fontSize: "13px",
                          }}
                        >
                          {a.email}
                        </td>
                        <td style={{ padding: "12px" }}>
                          <span
                            style={{
                              background: "#0f172a",
                              border: "1px solid #334155",
                              borderRadius: "6px",
                              padding: "3px 10px",
                              fontSize: "12px",
                              color: "#a78bfa",
                            }}
                          >
                            {a.curso || "—"}
                          </span>
                        </td>
                        <td style={{ padding: "12px", textAlign: "center" }}>
                          <button
                            onClick={() => excluirComSenha(a.id_aluno, a.nome)}
                            style={{
                              color: "#ef4444",
                              border: "1px solid #ef4444",
                              background: "none",
                              borderRadius: "6px",
                              padding: "4px 14px",
                              cursor: "pointer",
                              fontSize: "12px",
                            }}
                          >
                            Remover
                          </button>
                        </td>
                      </tr>
                    ))}
                    {listaExibida.length === 0 && (
                      <tr>
                        <td
                          colSpan="5"
                          style={{
                            padding: "24px",
                            textAlign: "center",
                            color: "#475569",
                          }}
                        >
                          Nenhum registro encontrado.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Paginação */}
              {mostrarTodos && !buscaTermo && totalPaginas > 1 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "20px",
                  }}
                >
                  <button
                    onClick={() => mudarPagina(paginaAtual - 1)}
                    disabled={paginaAtual === 1}
                    style={{
                      background: "#0f172a",
                      color: paginaAtual === 1 ? "#334155" : "#f1f5f9",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      padding: "8px 14px",
                      cursor: paginaAtual === 1 ? "not-allowed" : "pointer",
                      fontSize: "13px",
                    }}
                  >
                    ← Anterior
                  </button>
                  {Array.from({ length: Math.min(totalPaginas, 7) }, (_, i) => {
                    const pg =
                      totalPaginas <= 7
                        ? i + 1
                        : Math.max(1, paginaAtual - 3) + i;
                    if (pg > totalPaginas) return null;
                    return (
                      <button
                        key={pg}
                        onClick={() => mudarPagina(pg)}
                        style={{
                          background:
                            paginaAtual === pg ? "#38bdf8" : "#0f172a",
                          color: paginaAtual === pg ? "#0f172a" : "#f1f5f9",
                          border: "1px solid #334155",
                          borderRadius: "8px",
                          padding: "8px 14px",
                          cursor: "pointer",
                          fontWeight: paginaAtual === pg ? "bold" : "normal",
                          fontSize: "13px",
                        }}
                      >
                        {pg}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => mudarPagina(paginaAtual + 1)}
                    disabled={paginaAtual === totalPaginas}
                    style={{
                      background: "#0f172a",
                      color:
                        paginaAtual === totalPaginas ? "#334155" : "#f1f5f9",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      padding: "8px 14px",
                      cursor:
                        paginaAtual === totalPaginas
                          ? "not-allowed"
                          : "pointer",
                      fontSize: "13px",
                    }}
                  >
                    Próxima →
                  </button>
                </div>
              )}
            </div>

            {/* Ranking de cursos */}
            <div
              style={{
                background: "#1e293b",
                padding: "28px",
                borderRadius: "20px",
                border: "1px solid #334155",
              }}
            >
              <h3 style={{ marginBottom: "20px" }}>
                Ranking de Popularidade (Cursos)
              </h3>
              {cursos.map((c, i) => (
                <div key={c.id_serial} style={{ marginBottom: "16px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "13px",
                      marginBottom: "5px",
                    }}
                  >
                    <span>{c.nome_curso}</span>
                    <span style={{ color: "#38bdf8" }}>
                      {92 - i * 4}% de Ocupação
                    </span>
                  </div>
                  <div
                    style={{
                      height: "8px",
                      background: "#0f172a",
                      borderRadius: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: `${92 - i * 4}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, #38bdf8, #22c55e)",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ABA SOBRE ── */}
        {abaAtiva === "sobre" && (
          <div style={{ maxWidth: "820px" }}>
            <h1 style={{ color: "#38bdf8", marginBottom: "20px" }}>
              Nossa História e Missão
            </h1>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.8",
                marginBottom: "16px",
              }}
            >
              A <strong>ELFAedu</strong> é o resultado da união de duas
              educadoras visionárias de Muriaé: <strong>Ellen e Fabiana</strong>
              . Com o propósito de democratizar o acesso ao conhecimento técnico
              de qualidade, criaram uma instituição pautada na{" "}
              <strong>competência, dedicação e responsabilidade</strong>.
            </p>
            <p style={{ fontSize: "18px", lineHeight: "1.8" }}>
              Aqui, cada aluno é tratado com a individualidade que merece, com
              suporte acadêmico e orientação para o mercado de trabalho.
            </p>
            <div style={{ display: "flex", gap: "20px", marginTop: "36px" }}>
              {[
                {
                  titulo: "Valores",
                  desc: "Ética, Transparência e Inovação constante no método SENAI de ensino.",
                  cor: "#38bdf8",
                },
                {
                  titulo: "Resultados",
                  desc: "Liderança em empregabilidade técnica na cidade de Muriaé e Zona da Mata.",
                  cor: "#22c55e",
                },
              ].map((c) => (
                <div
                  key={c.titulo}
                  style={{
                    background: "#1e293b",
                    padding: "24px",
                    borderRadius: "16px",
                    flex: 1,
                    borderTop: `4px solid ${c.cor}`,
                  }}
                >
                  <h3 style={{ color: c.cor, marginBottom: "10px" }}>
                    {c.titulo}
                  </h3>
                  <p style={{ color: "#94a3b8", lineHeight: "1.6" }}>
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ABA GALERIA ── */}
        {abaAtiva === "galeria" && (
          <div>
            <h1 style={{ color: "#38bdf8", marginBottom: "28px" }}>
              Ambiente de Aprendizado
            </h1>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "24px",
              }}
            >
              {[
                {
                  src: "/imagens/bibliotecaprincipal.jpg",
                  label: "Biblioteca Central",
                },
                { src: "/imagens/ti.jpg", label: "Núcleo de Tecnologia (TI)" },
                {
                  src: "/imagens/costuraind.jpg",
                  label: "Centro de Costura Industrial",
                },
                { src: "/imagens/biblioteca.jpg", label: "Espaço de Pesquisa" },
                {
                  src: "/imagens/laboratorio.jpg",
                  label: "Laboratório de Práticas",
                },
                {
                  src: "/imagens/costura.jpg",
                  label: "Ateliê de Moda e Design",
                },
              ].map((img) => (
                <div
                  key={img.src}
                  style={{
                    borderRadius: "14px",
                    overflow: "hidden",
                    background: "#1e293b",
                    border: "1px solid #334155",
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    style={{
                      width: "100%",
                      height: "210px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <div
                    style={{
                      padding: "16px",
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                  >
                    {img.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ABA DEPOIMENTOS ── */}
        {abaAtiva === "feedback" && (
          <div>
            <h1 style={{ color: "#38bdf8", marginBottom: "28px" }}>
              Vozes do Sucesso
            </h1>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
                gap: "24px",
              }}
            >
              {[
                {
                  n: "Ana Paula Rocha",
                  c: "Design de Moda",
                  t: "A ELFAedu mudou minha carreira. Em menos de 2 meses após o curso, abri meu próprio ateliê em Muriaé!",
                },
                {
                  n: "Marcos Vinícius",
                  c: "TI & Redes",
                  t: "O laboratório de TI é incrível. O conhecimento prático me garantiu uma vaga de desenvolvedor júnior.",
                },
                {
                  n: "Beatriz Souza",
                  c: "Corte e Costura",
                  t: "Ellen e Fabiana criaram um ambiente acolhedor. Aprendi mais aqui do que em anos de tentativas sozinhas.",
                },
                {
                  n: "Ricardo Silva",
                  c: "Logística Industrial",
                  t: "A escola é referência. A carga técnica é pesada e nos prepara de verdade para o mundo real.",
                },
              ].map((d, i) => (
                <div
                  key={i}
                  style={{
                    background: "#1e293b",
                    padding: "28px",
                    borderRadius: "20px",
                    borderBottom: `4px solid ${i % 2 === 0 ? "#38bdf8" : "#22c55e"}`,
                  }}
                >
                  <p
                    style={{
                      fontStyle: "italic",
                      fontSize: "16px",
                      lineHeight: "1.7",
                      marginBottom: "18px",
                      color: "#e2e8f0",
                    }}
                  >
                    "{d.t}"
                  </p>
                  <div style={{ textAlign: "right" }}>
                    <strong style={{ display: "block", color: "#38bdf8" }}>
                      {d.n}
                    </strong>
                    <small style={{ color: "#64748b" }}>
                      Ex-aluno(a) de {d.c}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
        button:not(:disabled):hover { opacity: 0.88; }
        input:focus, select:focus { outline: 2px solid #38bdf8; outline-offset: 1px; }
      `}</style>
    </div>
  );
}

export default App;
