import React from 'react'
import PropTypes from 'prop-types'

/**
 *
 * @param {Object} props  - data passed to the component
 * @param {JSX.Element} props.children - children
 * @returns {JSX.Element}
 */

function Container({ children }) {
  return (
    <div
      style={{
        width: '500px',
        height: '600px',
        backgroundColor: 'yellow',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Container
