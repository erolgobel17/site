import { keyBy } from 'lodash';
import { SemanticCOLORS } from 'semantic-ui-react';
import CompoundLogo from '../assets/compound-logo.png';
import CryptoKittiesLogo from '../assets/cryptokitties-logo.svg';
import DyDxLogo from '../assets/dydx-logo.svg';
import ENSLogo from '../assets/ens-logo.svg';
import KickbackLogo from '../assets/kickback-logo.svg';
import KyberNetworkLogo from '../assets/kybernetwork-logo.svg';
import LocalEthereumLogo from '../assets/localethereum-logo.svg';
import MakerDAOLogo from '../assets/makerdao-logo.svg';
import MyCryptoLogo from '../assets/mycrypto-logo.svg';
import PeepethLogo from '../assets/peepeth-logo.png';
import RadarRelayLogo from '../assets/radarrelay-logo.svg';
import UniswapLogo from '../assets/uniswap-logo.png';
import { getBlockyDataUri } from './blockies';
import { SHOW_ALL_SITES } from './env';

export enum SiteCategory {
  ADMIN = 'Admin & Developer',
  DEFI = 'Decentralized Finance',
  EXCHANGE = 'Exchange',
  GAME = 'Game',
  SOCIAL = 'Social',
  WORK = 'Work',
}

export const CATEGORY_LABEL_COLORS: { [category in SiteCategory]: SemanticCOLORS } = {
  [ SiteCategory.ADMIN ]: 'black',
  [ SiteCategory.DEFI ]: 'olive',
  [ SiteCategory.GAME ]: 'pink',
  [ SiteCategory.SOCIAL ]: 'yellow',
  [ SiteCategory.WORK ]: 'blue',
  [ SiteCategory.EXCHANGE ]: 'violet'
};

interface IntegrationStatus {
  readonly integrated: boolean;
}

export interface Site {
  readonly logo: string;
  readonly name: string;
  readonly status: IntegrationStatus;
  readonly description: string;
  readonly url: URL;
  readonly category: SiteCategory;
}

export const ALL_SITES_INFO: Readonly<Site[]> = [
  {
    logo: CompoundLogo,
    name: 'Compound',
    description: 'Compound is a transparent, autonomous money market— allowing users & applications to frictionlessly earn interest or borrow Ethereum assets without relying on a counterparty.',
    category: SiteCategory.DEFI,
    url: new URL('https://app.compound.finance'),
    status: { integrated: false }
  },
  {
    logo: CryptoKittiesLogo,
    name: 'CryptoKitties',
    description: 'CryptoKitties is a game centered around breedable, collectible, and oh-so-adorable creatures we call CryptoKitties! Each cat is one-of-a-kind and 100% owned by you; it cannot be replicated, taken away, or destroyed.',
    category: SiteCategory.GAME,
    url: new URL('https://www.cryptokitties.co'),
    status: { integrated: false }
  },
  {
    logo: DyDxLogo,
    name: 'dYdX',
    description: 'The most powerful open trading platform for crypto assets.',
    url: new URL('https://trade.dydx.exchange'),
    category: SiteCategory.EXCHANGE,
    status: { integrated: false }
  },
  {
    logo: ENSLogo,
    name: 'Ethereum Name Service (ENS)',
    description: 'ENS offers a secure & decentralised way to address resources both on and off the blockchain using simple, human-readable names.',
    url: new URL('https://manager.ens.domains'),
    category: SiteCategory.ADMIN,
    status: { integrated: true }
  },
  {
    logo: '/ethvault-logo.svg',
    name: 'Ethvault Wallet',
    description: 'A simple mobile friendly wallet for sending basic transactions and signing messages.',
    url: new URL('https://wallet.apps.myethvault.com'),
    category: SiteCategory.ADMIN,
    status: { integrated: true }
  },
  {
    logo: getBlockyDataUri('Ethlance'),
    name: 'Ethlance',
    description: 'The future of work is now. Hire or work for Ether cryptocurrency.',
    url: new URL('https://ethlance.com'),
    category: SiteCategory.WORK,
    status: { integrated: false }
  },
  {
    logo: KickbackLogo,
    name: 'Kickback',
    description: 'Event no shows? No problem. Meet Kickback—an Ethereum-based event management service that delivers higher event participation rates by asking registrants to put some skin in the game.',
    url: new URL('https://kickback.events'),
    category: SiteCategory.SOCIAL,
    status: { integrated: false }
  },
  {
    logo: KyberNetworkLogo,
    name: 'Kyberswap',
    description: 'Kyber is an on-chain liquidity protocol that aggregates liquidity from a wide range of reserves, powering instant and secure token exchange in any decentralized application.',
    url: new URL('https://kyberswap.com'),
    category: SiteCategory.DEFI,
    status: { integrated: false }
  },
  {
    logo: LocalEthereumLogo,
    name: 'LocalEthereum',
    description: 'LocalEthereum is how people exchange ETH peer-to-peer.',
    url: new URL('https://localethereum.com'),
    category: SiteCategory.EXCHANGE,
    status: { integrated: true }
  },
  {
    logo: MakerDAOLogo,
    name: 'MakerDAO CDP Portal',
    description: 'Maker is comprised of a decentralized stablecoin, collateral loans, and community governance',
    url: new URL('https://makerdao-scd-cdp.apps.myethvault.com'),
    category: SiteCategory.DEFI,
    status: { integrated: true }
  },
  {
    logo: MyCryptoLogo,
    name: 'MyCrypto',
    description: 'MyCrypto is an open-source, client-side tool for generating ether wallets, handling ERC-20 tokens, and interacting with the blockchain more easily.',
    url: new URL('https://mycrypto.com/account'),
    category: SiteCategory.ADMIN,
    status: { integrated: false }
  },
  {
    logo: PeepethLogo,
    name: 'Peepeth',
    description: 'MyCrypto is an open-source, client-side tool for generating ether wallets, handling ERC-20 tokens, and interacting with the blockchain more easily.',
    url: new URL('https://peepeth.com'),
    category: SiteCategory.SOCIAL,
    status: { integrated: false }
  },
  {
    logo: RadarRelayLogo,
    name: 'Radar Relay',
    description: 'The most secure way to trade ERC20 tokens directly from your Ethereum wallet.',
    url: new URL('https://app.radarrelay.com'),
    category: SiteCategory.EXCHANGE,
    status: { integrated: false }
  },
  {
    logo: UniswapLogo,
    name: 'Uniswap',
    description: 'Uniswap is a protocol for automated token exchange on Ethereum.',
    url: new URL('https://uniswap.apps.myethvault.com'),
    category: SiteCategory.DEFI,
    status: { integrated: true }
  }
];

export const VISIBLE_SITES = ALL_SITES_INFO.filter(site => SHOW_ALL_SITES || site.status.integrated);

export const SITES_BY_URL_HOST: { [ urlHost: string ]: Site } = keyBy(ALL_SITES_INFO, site => site.url.host);