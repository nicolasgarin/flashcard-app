import React, { useState } from 'react'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import LineChart from './LineChart';
import PieChart from './PieChart';
import { useGame } from '../context/GameContext';

export default function StatChart(props) {
    const { infoResp } = useGame()
    const [key, setKey] = useState('categoria');
    let parcial = 0;
    const lineChartData = infoResp.map(info => {
        return [(infoResp.indexOf(info) + 1).toString(), info.acierto == true ? parcial += 1 : parcial -= 1]
    })

    return (
        <Tabs
            id="statTabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 d-flex justify-content-end"
        >
            <Tab eventKey="categoria" title="Por categoría">
                <Tab.Container id="catStats" defaultActiveKey='0'>
                    <Row>
                        <Col sm={4}>
                            <Nav variant="pills" className="flex-column">
                                {props.catInfo.map(cat => {
                                    return <Nav.Item>
                                        <Nav.Link eventKey={props.catInfo.indexOf(cat)}>{cat.catName}</Nav.Link>
                                    </Nav.Item>
                                })}
                            </Nav>
                        </Col>
                        <Col sm={8} className="stats-chart" >
                            <Tab.Content className='chart-info'>
                                {
                                    props.catInfo.map(cat => {
                                        return <Tab.Pane eventKey={props.catInfo.indexOf(cat)}>
                                            <div className='row'>
                                                <div className='col-6 info-col'>
                                                    <div>Total de intentos: {cat.catInfo.length}</div>
                                                    <div>Total de aciertos: {cat.catInfo.filter(info => info.acierto == true).length}</div>
                                                    <div>Total de erradas: {cat.catInfo.length - cat.catInfo.filter(info => info.acierto == true).length}</div>
                                                    <div>Mejor racha de aciertos: {props.mejorRacha(cat.catInfo, 'mejor')}</div>
                                                    <div>Peor racha: {props.mejorRacha(cat.catInfo, 'peor')}</div>
                                                </div>
                                                <div className='col-6 piechart'>
                                                    <PieChart aciertos={cat.catInfo.filter(info => info.acierto == true).length} errores={cat.catInfo.length - cat.catInfo.filter(info => info.acierto == true).length} />
                                                </div>
                                            </div>
                                        </Tab.Pane>
                                    })
                                }
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Tab>
            <Tab eventKey="evolucion" title="Evolución">
                <div className='linechart'>
                    <LineChart chartData={lineChartData} />
                </div>
            </Tab>
        </Tabs>

    );
}