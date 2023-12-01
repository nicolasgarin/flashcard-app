import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import StatChart from '../StatChart';

export default function Stats({ infoResp }) {
  const [catInfo, setCatInfo] = useState([])
  const stats = {
    cPuntuacion: infoResp.filter(info => info.acierto == true).length,
    cIntentos: infoResp.length,
    rachaActual: mejorRacha(infoResp, 'actual'),
    mejorRacha: mejorRacha(infoResp, 'mejor'),
    peorRacha: mejorRacha(infoResp, 'peor'),
  }
  const catList = []

  useEffect(updateCatInfo, [])
  const cats = infoResp.filter(info => {
    const duplicado = catList.includes(info.categoria)
    if (!duplicado) {
      catList.push(info.categoria)
      return true
    }
    return false;
  })

  function updateCatInfo() {
    setCatInfo(catList.map(cat => ({
      catName: cat,
      catId: uuidv4(),
      catInfo: infoResp.filter(info => (
        info.categoria == cat))
    }))
    )
  }

  function mejorRacha(infoResp, func) {
    let cant = 0
    let racha = false
    let rachas = []
    for (let info of infoResp) {
      if (func == 'peor') {
        if ((info.acierto == false && cant == 0) || (info.acierto == false && racha == true)) {
          cant += 1
          racha = true
        } else {
          racha = false
          cant = 0
        }
        rachas.push(cant)
      } else {
        if ((info.acierto == true && cant == 0) || (info.acierto == true && racha == true)) {
          cant += 1
          racha = true
        } else {
          racha = false
          cant = 0
        }
        rachas.push(cant)
      }
    }
    if (func == 'actual') {
      return cant
    } else if (func == 'mejor' || func == 'peor') {
      return Math.max(...rachas)
    }
  }

  function efectividad(catInfo, func) {
    let cat = ''
    let cant = []
    for (let info of catInfo) {
      if (func == 'aciertos') {
        cant.push(info.catInfo.filter(info => info.acierto == true).length)

        if (catInfo.length > 0) {
          cat = catInfo[cant.indexOf(Math.max(...cant))].catName
        }
      } else if (func == 'efectividad') {
        cant.push((info.catInfo.filter(info => info.acierto == true).length * 100) / info.catInfo.length)
        if (catInfo.length > 0) {
          cat = catInfo[cant.indexOf(Math.max(...cant))].catName
        }
      }
    }
    return cat
  }

  return (
    <>
      <div className='body'>
        <div className='container'>
          <div className='stats row'>
            <div className='col-4'>
              <h2>Estadísticas generales</h2>
              <div>Cantidad de preguntas respondidas: {stats.cIntentos}</div>
              <div>Cantidad de preguntas acertadas: {stats.cPuntuacion}</div>
              <div>Cantidad de preguntas erradas: {stats.cIntentos - stats.cPuntuacion}</div>
              <div>Porcentaje de aciertos: {Math.round((stats.cPuntuacion * 100) / stats.cIntentos)}%</div>
              <div>Racha actual: {stats.rachaActual}</div>
              <div>Mejor racha de aciertos: {stats.mejorRacha}</div>
              <div>Peor racha: {stats.peorRacha}</div>
              <div>Categoría con más aciertos: {efectividad(catInfo, 'aciertos')}</div>
              <div>Categoría con mejor efectividad: {efectividad(catInfo, 'efectividad')}</div>
            </div>
            <div className='col-8'>
              <h3>Por categoría</h3>
              <StatChart catInfo={catInfo} mejorRacha={mejorRacha} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

