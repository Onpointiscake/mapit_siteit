import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'

export default class Footer extends Component {
    render() {
        return (
            <div>
                <Card className="text-center">
                    <Card.Footer className="text-muted">
                    <a href="mapit.com">Mapit</a> por Javier Suarez 2020
                    </Card.Footer>
                    <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                </Card>
            </div>
        )
    }
}
