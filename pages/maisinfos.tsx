import type { NextPage } from 'next';
import React from 'react';
import Image from 'next/image'
import HeaderComponent from '../components/header';
import Divider from '@mui/material/Divider';
import divider from '../public/images/divider.svg'
import formula from '../public/images/formula.svg'
import icon from '../public/images/adm-icon.svg'
import seta from '../public/images/arrow.png'
import styles from '../styles/components/MaisInfos.module.css';

const interHeader = [
    {
      id: 1,
      name: 'Sistema de Dados',
      path: 'sistemadedados'
    },
    {
      id: 2,
      name: 'Mais Informações',
      path: 'maisinfos'
    },
    {
      id: 3,
      name: 'Área Adminsitrativa',
      path: 'adm'
    }
  ]

const MaisInfosComponent: NextPage = () => {
    return(
        <div className={styles.infos}>
            <HeaderComponent elements={interHeader}></HeaderComponent>
            <div className={styles.maisinfos}>
                <div className={styles.container}>
                    <h2>Entenda nosso modelo estatístico</h2>

                    <Divider className={styles.divider} sx={{ borderBottomWidth: '3px' }}></Divider>

                    <div className={styles.box_container}>
                        <div className={styles.box}>
                            <h3 className={styles.dados}>Dados inseridos/Variáveis utilizadas</h3>
                            <h4>Partos, Partos Normais,</h4>
                            <h4>Partos Sensíveis,</h4>
                            <h4>Internações Evitadas,</h4>
                            <h4>Taxa de Mortalidade</h4>
                            <h4>Materna</h4>
                        </div>

                        <span className={styles.seta}>
                            <Image src={seta} alt="Seta" width={50} height={50}/>
                        </span>

                        <div className={styles.box}>
                            <h3>Modelo de cálculo estatístico utilizado</h3>
                            <span className={styles.formula}>
                                <Image src={formula} alt="Fórmula" width={200} height={70}/>
                            </span>
                            <h4>Acessar arquivo completo</h4>
                        </div>
                    </div>
                </div>

                <div className={styles.container}>
                    <h2>Onde são coletados nossos dados</h2>

                    <Divider sx={{ borderBottomWidth: '3px' }}></Divider>

                    <div className={styles.box_container}>
                        <div className={styles.box}>
                            <h3>Portal da Transparência - Registro Civil</h3>
                                <a href='https://transparencia.registrocivil.org.br/registros'>
                                    <h4>https://transparencia.registrocivil.org.br/registros</h4>
                                </a>
                            <h3>Portal da Transparência - Registro Civil</h3>
                                <a href='https://transparencia.registrocivil.org.br/registros'>
                                    <h4>https://transparencia.registrocivil.org.br/registros</h4>
                                </a>
                        </div>

                        <span className={styles.seta}>
                            <Image src={divider} alt="Divisor" width={50} height={120}/>
                        </span>

                        <div className={styles.box}>
                            <h3>Portal da Transparência - Registro Civil</h3>
                                <a href='https://transparencia.registrocivil.org.br/registros'>
                                    <h4>https://transparencia.registrocivil.org.br/registros</h4>
                                </a>
                            <h3>Portal da Transparência - Registro Civil</h3>
                                <a href='https://transparencia.registrocivil.org.br/registros'>
                                    <h4>https://transparencia.registrocivil.org.br/registros</h4>
                                </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MaisInfosComponent;