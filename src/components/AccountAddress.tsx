import * as React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { copyAddressToClipboard, showQrCode } from '../actions/accounts-actions';
import { GlobalState } from '../reducers';
import { Account } from '../util/model';
import { NetworkId, NETWORKS_INFO } from '../util/networks';
import ExternalLink from './ExternalLink';
import { FlexChildFixed, FlexChildGrow, FlexParent } from './FlexRowComponents';
import { AnalyticsCategory } from './GoogleAnalytics';
import TrackedButton from './TrackedButton';

const FlexChildGrowNoWrap = styled(FlexChildGrow)`
  white-space: nowrap;
  text-overflow: ellipsis;
`;

interface AccountAddressProps {
  account: Account | null;
  network: NetworkId;
  showQrCode: (id: string) => void;
  copyAddressToClipboard: (id: string) => void;
}

export default connect(
  ({ accounts: { accounts }, ethereumProvider: { network } }: GlobalState, { accountId }: { accountId: string; }) => ({
    account: accounts.find(account => account.id === accountId) || null,
    network
  }),
  { showQrCode, copyAddressToClipboard }
)(
  ({ account, showQrCode, copyAddressToClipboard, network }: AccountAddressProps) => (
    account ? (
      <FlexParent>
        <FlexChildGrowNoWrap title={account.address}>
          {account.ensName ? account.ensName : account.address}
        </FlexChildGrowNoWrap>
        <FlexChildFixed>
          <TrackedButton
            category={AnalyticsCategory.ACCOUNTS}
            action={'SHOW_QR_CODE'}
            title="Show QR code"
            onClick={() => showQrCode(account.id)}
            icon compact basic>
            <Icon name="qrcode"/>
          </TrackedButton>
        </FlexChildFixed>
        <FlexChildFixed>
          <TrackedButton
            category={AnalyticsCategory.ACCOUNTS}
            action={'COPY_ADDRESS_TO_CLIPBOARD'}
            title="Copy address to clipboard"
            onClick={() => copyAddressToClipboard(account.id)}
            icon compact basic>
            <Icon name="clipboard"/>
          </TrackedButton>
        </FlexChildFixed>
        <FlexChildFixed>
          <TrackedButton
            category={AnalyticsCategory.ACCOUNTS}
            action={'VIEW_ON_ETHERSCAN'}
            icon compact basic as={ExternalLink}
            title="View on Etherscan"
            href={`${NETWORKS_INFO[ network ].etherscanBaseUrl}/address/${account.ensName ? account.ensName : account.address}`}>
            <Icon name="external"/>
          </TrackedButton>
        </FlexChildFixed>
      </FlexParent>
    ) : null
  )
);