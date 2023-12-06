import React, { useState } from 'react'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PieChart from './PieChart';

export default function StatChart({ catInfo, mejorRacha }) {
    const [key, setKey] = useState('home');

    return (
        <Tabs
        id="statTabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 d-flex justify-content-end"
      >
        <Tab eventKey="home" title="Por categoría">
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
        </Tab>
        <Tab eventKey="profile" title="Evolución">
          Tab content for Profile
        </Tab>
      </Tabs>

    );
}
