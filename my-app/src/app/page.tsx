import React from 'react';
import fotoPerfil from '../assets/fotoPerfil.png';
import MeiaIngrenagem from '../assets/meiaIngrenagem.png';
import fotoMaior from '../assets/IMG_1977 2.png';
import projetoBancoPessoalImg from '../assets/imgbancopessoal.png';
import projetoEcomerceImg from '../assets/imgProjetoE-comerce.png';
import projetoToDoListImg from '../assets/imgtodoList.png';

export default function Home() {
  return (
    <main className='h-screen'>
      <header className='w-full flex justify-between bg-slate-950 p-5 shadow-xl/30  border-b-1 border-white' >

        
          
       
        
        <div className="containerFotoPerfil  flex items-center justify-between w-full relative">
          <div className='flex items-center gap-1'>
            
              <img className='md:w-25 w-20 z-1' src={fotoPerfil.src} alt="" />
            
            
            
            <div className='text-xs text-white'>
            <h2 className='md:text-lg text-blue-200 font-bold'>YURI</h2>
            <h3>Corrêa</h3>
          
          </div>
          </div>        
          
          <div className='md:text-lg text-xs text-center text-white bg-black-500'>
            <h4>Bem-vindo</h4>
            <h5>Portifólio</h5>
          </div>
         
          <div className='md:text-lg  flex flex-col  h-full justify-between items-center text-white '>

            <div className='float-up-down'>
            ⏬
            </div>

          </div>
          
        </div>
      </header>

      <main className=' h-183 '>
        <div className='containerMain h-full items-center flex  text-white justify-center space-y-5'>
          
          <div className="containerMeiaIngrenagem  flex flex-col space-y-4 items-center justify-center text-center">
            <div>
              <img className=' p- rotate h-15 w-15 ' src={MeiaIngrenagem.src} alt=""/>
              <img className=' p- rotate h-35 w-35 ' src={MeiaIngrenagem.src} alt=""/>
            </div>
            
            
            <div>
            <h1 className='text-blue-500 text-2xl'>ENGENHEIRO DE SOFTWARE</h1>
            <h3 className=''>Apaixonado por tecnologia</h3>
            </div>
           
          </div>
          
        </div>

      </main>
      <main id='indice' className='h-screen flex items-center justify-center '>

        <section className='xl:flex xl:w-full xl:h-full xl:justify-center xl:items-center xl:gap-50' >

          <h1 className=' mb-5 text-center text-3xl text-blue-500'>Opções</h1>
          <ul className='xl:text-xl text-white space-y-3 '>
            <a className='' href="#sobre"><li className='xl:text-start p-2 text-center btnoptions'>Saiba mais sobre mim</li></a>
            <a href="#habilidade"><li className='xl:text-start  p-2 text-center btnoptions'>Conheça minhas habilidades</li></a>
            <a href="#projetos"><li className='xl:text-start  p-2 text-center btnoptions '>Veja meus projetos</li></a>
            <a href="#contato"><li className='xl:text-start  p-2 text-center btnoptions'>Entre em contato comigo</li></a>
          </ul>
          


        </section>
      </main>

      <main id='sobre' className='p-5  flex items-center justify-center   '>

        <section className='xl:flex-row  sobre h-screen flex flex-col xl:items-center  space-y-4'>
          <div className='xl:w-full'>
          <h1 className='mb-5 text-center text-3xl text-blue-500'>Sobre mim</h1>
          </div>
          <div className='xl:h-140 xl:flex-col xl:space-y-2 w-full flex items-center justify-center'>
            <img className='xl:h-150 xl:w-100 md:w-80 w-45' src={fotoMaior.src} alt="" />

            <div className='space-y-5'>
            <p className='xl:text-sm md:text-lg text-white text-xs ml-2'>Prazer, sou Yuri Corrêa Desenvolvedor apaixonado por transformar ideias em soluções inteligentes.</p>
            
            <div className="xl:justify-start  md:w-full md:text-2xl containerRedes w-fit text-white flex items-center justify-center gap-3 p-3">
            <a className='' href="http://"><i className="btnoptionsBtn-RedesSociais text-slate-800 fa-brands fa-github btn-animado p-1 "></i></a>
            <a href="http://"><i className="btnoptionsBtn-RedesSociais text-slate-800 fa-brands fa-linkedin-in btn-animado p-1 "></i></a>
            <a href="http://"><i className="btnoptionsBtn-RedesSociais text-slate-800 fa-brands fa-square-instagram btn-animado p-1 "></i></a>
            <a href="http://"><i className="btnoptionsBtn-RedesSociais text-slate-800 fa-brands fa-square-whatsapp btn-animado p-1 "></i></a>
            <a href="http://"><i className="btnoptionsBtn-RedesSociais text-slate-800 fa-solid fa-envelope btn-animado p-1 "></i></a>
            </div>

            </div>

            
          </div>
          <div>

            <p className='xl:mb-45 md:w-full md:p-5  md:text-lg text-white'>
              Moro em Florianópolis. Sou estudante de <span className='text-blue-500 '>Engenharia de Software</span> pela Faculdade Anhanguera, atualmente cursando o 4º período.
Sempre fui apaixonado por <span className='text-blue-500 '>tecnologia</span>, inovação e por entender como as coisas funcionam por trás dos bastidores. Escolhi essa área porque <span className='text-blue-500 '>acredito</span> no poder da tecnologia para <span className='text-blue-500 '>transformar</span> o mundo.
Tenho estudado bastante <span className='text-blue-500 '>Programação Orientada a Objetos</span>, desenvolvimento web com <span className='text-blue-500 '>Next.js e React</span>.
 Meu <span className='text-blue-500 '>objetivo</span> é me tornar um desenvolvedor de software <span className='text-blue-500 '>completo</span>.
Quando não estou programando, gosto de <span className='text-blue-500 '>ouvir música</span>, aprender sobre finanças e cuidar da minha gatinha. Acredito que <span className='text-blue-500 '>disciplina</span>, <span className='text-blue-500 '>consistência</span> e <span className='text-blue-500 '>aprendizado</span> contínuo são <span className='text-blue-500 '>chaves</span> para o <span className='text-blue-500 '>sucesso</span>.
            </p>
          </div>
          
        </section>

      </main>

      

      <main id='habilidade' className=' xl:flex-row xl:space-x-5  containerHabilidades h-screen  space-y-5 flex items-center justify-center flex-col  '>
        <div className='p-5'>
          <h1 className='text-center text-3xl text-blue-500 '>Habilidades</h1>
          <p className='md:text-lg text-white text-center'>Aqui estão algumas das minhas habilidades e <span className='text-blue-500'>tecnologias que domino</span> </p>
        </div>

        <div className='lg:space-y-4 lg:p-2 lg:w-full lg:items-center lg:gap-0 sm:grid-cols-2 sm:p-5  xl:grid-cols-2 xl:space-y-5 xl:space-x-5 xl:w-fitt xl:gap-0 grid md:grid-cols-2 lg:grid-cols-2 gap-5'>

          <div className='lg:flex lg:flex-col lg:items-center'>
            <h2 className='text-white ml-2 mb-1 text-xs'>Liguagem de Programação</h2>

            <div className='md:h-35 text-white border-1 border-dashed  border-blue-500 p-5 rounded-lg w-80 '>
              <ul>
                <div className='flex gap-2 items-center'>
                <li>JavaScript</li>
                <div className='w-full h-2 border-1'>
                  <div className='nivel w-40 h-1 bg-green-500'></div>
                </div>
                </div>

                <div className='flex gap-2 items-center'>
                <li>Php</li>
                <div className='w-full h-2 border-1'>
                  <div className='nivel w-28 h-1 bg-yellow-500'></div>
                </div>
                </div>

                <div className='flex gap-2 items-center'>
                <li>Java</li>
                <div className='w-full h-2 border-1'>
                  <div className='nivel w-32 h-1 bg-green-500'></div>
                </div>
                </div>
                </ul>
            </div>

          </div>
        
        
        <div className='lg:flex lg:flex-col lg:items-center'>
            <h2 className='text-white ml-2 text-xs mb-1'>Famework</h2>

            <div className='text-white border-1 border-dashed  border-blue-500 p-5 rounded-lg w-80 '>
              <ul>
                <div className='flex gap-2 items-center'>
                <li>React</li>
                <div className='w-full h-2 border-1'>
                  <div className='nivel w-52 h-1 bg-green-700'></div>
                </div>
                </div>

                <div className='flex gap-2 items-center'>
                <li>Next.js</li>
                <div className='w-full h-2 border-1'>
                  <div className='nivel w-52 h-1 bg-green-700'></div>
                </div>
                </div>

                <div className='flex gap-2 items-center'>
                <li>Tailwind</li>
                <div className='w-full h-2 border-1'>
                  <div className='nivel w-45 h-1 bg-green-700'></div>
                </div>
                
                </div>
                <div className='flex gap-2 items-center'>
                <li>Bootstrep</li>
                <div className='w-full h-2 border-1'>
                  <div className='nivel w-15 h-1 bg-red-700'></div>
                </div>
                </div>
                </ul>
            </div>

          </div>

        <div className='lg:flex lg:flex-col lg:items-center'>
            <h2 className='text-white ml-2 text-xs mb-1'>Abordagens e boas práticas</h2>

            <div className='md:h-47 text-white border-1 border-dashed  border-blue-500 p-5 rounded-lg w-80 '>
              <ul>
                <div className='flex gap-2 items-center'>
                <li>Clean code</li>
                <div className='w-full h-2 border-1'>
                   <div className='nivel w-17 h-1 bg-green-700'></div>
                </div>
                </div>

                <div className='flex gap-2 items-center'>
                <li>UML</li>
                <div className='w-full h-2 border-1'>
                   <div className='nivel w-17 h-1 bg-green-700'></div>
                </div>
                </div>
                <div className='flex gap-2 items-center'>
                <li>Ágile</li>
                <div className='w-full h-2 border-1'>
                   <div className='nivel w-54 h-1 bg-green-700'></div>
                </div>
                </div>
                <div className='flex gap-2 items-center'>
                <li>Git</li>
                <div className='w-full h-2 border-1'>
                   <div className='nivel w-54 h-1 bg-green-700'></div>
                </div>
                </div>
                </ul>
            </div>

          </div>

          <div className='lg:flex lg:flex-col lg:items-center'>
            <h2 className='text-white ml-2 text-xs mb-1'>SoftSkils</h2>

            <div className='text-white border-1 border-dashed  border-blue-500 p-5 rounded-lg w-80 '>
              <ul>
                <div className='flex gap-2 items-center'>
                <li>CNV</li>
                <div className='w-full h-2 border-1'>
                  <div className='nivel w-54 h-1 bg-green-700'></div>
                </div>
                </div>

                <div className='flex gap-2 items-center'>
                <li>Oratória</li>
                <div className='w-full h-2 border-1'>
                  <div className='nivel w-45 h-1 bg-green-700'></div>
                </div>
                </div>

                <div className='flex gap-2 items-center'>
                <li>Escrita</li>
                <div className='w-full h-2 border-1'>
                  <div className='nivel w-54 h-1 bg-green-700'></div>
                </div>
                </div>
                <div className='flex gap-2 items-center'>
                <li>Trabalho em equipe</li>
                <div className='w-full h-2 border-1'>
                  <div className='nivel w-43 h-1 bg-green-700'></div>
                </div>
                </div>
                <div className='flex gap-2 items-center'>
                <li>Liderança</li>
                <div className='w-full h-2 border-1'>
                  <div className='nivel w-48 h-1 bg-green-700'></div>
                </div>
                </div>
                </ul>
            </div>

          </div>
        </div>

      </main>

      <main id='projetos' className='xl:flex-row xl:items-center xl:justify-center containerProjetos h-screen flex items-center justify-center flex-col space-y-5'>
      <div className='xl:w-100 xl:text-end'>
        <h1 className='text-blue-500 text-3xl text-blue-500'>Projetos</h1>
      </div>

<div className="snap-x lg:justify-center xl:justify-center containerSlide w-full  flex overflow-x-auto space-x-4 p-4 scrollbar-hide ">
  {/* Slide 1 */}
  <div className="snap-center slide-item flex-shrink-0 text-white border border-blue-500 p-5 rounded-lg w-80 space-y-2">
    <h2 className="font-bold">BANCO PESSOAL</h2>
    <p className="text-xs">Aplicativo de gerenciamento de finanças pessoais.</p>
    <a className='text-xs' href="http://"><i className="text-white fa-brands fa-github"></i></a>
    <div className="flex justify-center mt-2">
      <img className="efectProjetos  w-40" src={projetoBancoPessoalImg.src} alt="Projeto Banco Pessoal" />
    </div>
  </div>

  {/* Slide 2 */}
  <div className="snap-center slide-item flex-shrink-0 text-white border border-blue-500 p-5 rounded-lg w-80 space-y-2">
    <h2 className="font-bold">Linho e grafite</h2> 
    <p className="text-xs">Loja e-commerce, loja de moda masculina.</p>
    <a className='text-xs' href="http://"><i className="text-white fa-brands fa-github"></i></a>
    <div className="flex justify-center mt-2">
      <img className="efectProjetos  w-30" src={projetoEcomerceImg.src} alt="Projeto Banco Pessoal" />
    </div>
  </div>

  {/* Slide 3 */}
  <div className=" snap-center slide-item flex-shrink-0 text-white border border-blue-500 p-5 rounded-lg w-80 space-y-2">
    <h2 className="font-bold">ToDo List</h2>
    <p className="text-xs">Aplicativo para gerenciamento de tarefas diárias.</p>
    <a className='text-xs' href="http://"><i className="text-white fa-brands fa-github"></i></a>
    <div className="flex justify-center mt-2">
      <img className="efectProjetos w-40" src={projetoToDoListImg.src} alt="Projeto Banco Pessoal" />
    </div>
  </div>
</div>





      </main>

      <main id='contato' className='xl:space-x-15  xl:flex xl:flex-row containerContato h-screen flex  items-center justify-center flex-col space-y-5 p-5'>
        <div>
          <h1 className='text-3xl text-center text-blue-500'>Fale Comigo</h1>
        </div>
        

        <div className='xl:text-start xl:w-120 xl:p-5  lg:text-lg text-white text-center '>
          <p>Se você está interessado em saber mais sobre mim, discutir oportunidades de trabalho ou apenas bater um papo sobre tecnologia, sinta-se à vontade para entrar em contato comigo.</p>
          <p>Estou sempre aberto a novas conexões e colaborações!</p>
          <div className='xl:text-start  text-white text-center'>
          <p>Você pode me encontrar nas redes sociais ou enviar um e-mail para mim.</p>
          <p>Estou ansioso para ouvir de você!</p>
          <div className="containerRedes md:text-lg  flex items-center justify-center gap-5 p-3">
            <a href="http://"><i className="btnoptionsBtn-RedesSociais  text-slate-800 fa-brands fa-github btn-animado p-1 "></i></a>
            <a href="http://"><i className="btnoptionsBtn-RedesSociais text-slate-800 fa-brands fa-linkedin-in btn-animado p-1"></i></a>
            <a href="http://"><i className="btnoptionsBtn-RedesSociais text-slate-800 fa-brands fa-square-instagram btn-animado p-1"></i></a>
            <a href="http://"><i className="btnoptionsBtn-RedesSociais text-slate-800 fa-brands fa-square-whatsapp btn-animado p-1"></i></a>
            <a href="http://"><i className="btnoptionsBtn-RedesSociais text-slate-800 fa-solid fa-envelope btn-animado p-1"></i></a>
            </div>
        </div>
        </div>
        
        
        <form className='md:w-120 w-full h-90 justify-between flex flex-col' action="">
          <div className='flex flex-col space-y-2'>
            <label className='text-white text-xs'>Nome</label>
            <input className='p-2 rounded-lg bg-slate-800 text-white' type="text" placeholder='Digite seu nome' />
          </div>
          <div className='flex flex-col space-y-2'>
            <label className='text-white text-xs'>E-mail</label>
            <input className='p-2 rounded-lg bg-slate-800 text-white' type="email" placeholder='Digite seu e-mail' />
          </div>
          <div className='flex flex-col space-y-2'>
            <label className='text-white text-xs'>Mensagem</label>
            <textarea className='p-2 rounded-lg bg-slate-800 h-30 text-white' placeholder='Digite sua mensagem'></textarea>
          </div>
          <button className='bg-blue-500 p-2 rounded-lg text-white btn-animado'>Enviar</button>
          <button className="btn-gradient-border">Clica Aqui</button>
        </form>
      </main>

      <footer>
        <div className='text-center text-xs text-slate-600 '>
          <p>Desenvolvido por Yuri Corrêa</p>
          <p>&copy; 2025 </p>
        </div>
      </footer>

    </main>
  );
}
