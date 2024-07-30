import React, { Component } from 'react'
import "../assets/Footer.css"

export default class Footer extends Component {
  render() {
    return (
      <footer className="main-footer" >
        <div className="copyright-section">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <p className="text1"><span className="inline-block">&copy {(new Date().getFullYear())} All rights reserved.</span></p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}
