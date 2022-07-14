import { Link } from 'gatsby'
import React from 'react'
import { scale } from './general'
import { navigationLinks } from '../config'

type LogoProps = {
  width: number
  height: number
}
const Logo = ({ width = 300, height = 120}: LogoProps) => (
  <Link to={navigationLinks.index.path}>
  <svg width="213" height="81" viewBox="0 0 213 81" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: scale(2)}}>
    <path d="M88.982 72.574L70.4641 40.5L88.982 8.42597H126.018L144.536 40.5L126.018 72.574H88.982Z" stroke="#fe640b" strokeWidth="6"/>
    <line x1="70" x2="-30" y1="41" y2="41" stroke="#fe640b" strokeWidth="6"/>
    <line x1="243" y1="41" x2="143" y2="41" stroke="#fe640b" strokeWidth="6"/>
    <path d="M98.816 41.536L96.608 36.544L95.6 41.536L92.336 58H87.008L94.304 22.72H94.88L104.576 41.776L107.456 48.16L110.336 41.776L119.84 22.72H120.368L127.952 58H122.672L119.12 41.536L118.064 36.544L116.144 41.536L107.6 58H107.312L98.816 41.536Z" fill="#fe640b"/>
  </svg>
  </Link>
)

export default Logo
