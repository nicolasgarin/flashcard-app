import React from 'react'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import PieChart from './PieChart';

export default function StatChart({ catInfo, mejorRacha }) {
    return (
        <Tab.Container id="catStats" defaultActiveKey='0'>
            <Row>
                <Col sm={4}>
                    <Nav variant="pills" className="flex-column">
                        {catInfo.map(cat => {
                            return <Nav.Item>
                                <Nav.Link eventKey={catInfo.indexOf(cat)}>{cat.catName}</Nav.Link>
                            </Nav.Item>
                        })}
                    </Nav>
                </Col>
                <Col sm={8} className="stats-chart" >
                    <Tab.Content className='chart-info'>
                        {
                            catInfo.map(cat => {
                                return <Tab.Pane eventKey={catInfo.indexOf(cat)}>
                                    <div className='row'>
                                        <div className='col-6 info-col'>
                                            <div>Total de intentos: {cat.catInfo.length}</div>
                                            <div>Total de aciertos: {cat.catInfo.filter(info => info.acierto == true).length}</div>
                                            <div>Total de erradas: {cat.catInfo.length - cat.catInfo.filter(info => info.acierto == true).length}</div>
                                            <div>Mejor racha de aciertos: {mejorRacha(cat.catInfo, 'mejor')}</div>
                                            <div>Peor racha: {mejorRacha(cat.catInfo, 'peor')}</div>
                                        </div>
                                        <div className='col-6 piechart'>
                                            <PieChart aciertos={cat.catInfo.filter(info => info.acierto == true).length} errores={cat.catInfo.length - cat.catInfo.filter(info => info.acierto == true).length} />
                                        </div>
                                    </div>
                                </Tab.Pane>
                            })}
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
}
