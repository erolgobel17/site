import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Icon, Input, Modal } from 'semantic-ui-react';
import { cancelUnlock, unlockAccount } from '../actions/accounts-actions';
import { GlobalState } from '../reducers';
import { Account } from '../util/model';
import AnimatedModal from './AnimatedModal';

interface UnlockAccountPasswordDialogProps {
  unlockingAccount: Account | null;
  unlockAccount: (id: string, password: string) => void;
  cancelUnlock: () => void;
}

interface UnlockAccountPasswordDialogState {
  password: string;
  rendering: Account | null;
}

export default connect(
  ({ accounts: { collectingUnlockPasswordId, accounts } }: GlobalState) => ({
    unlockingAccount: accounts.find(account => account.id === collectingUnlockPasswordId) || null
  }),
  {
    unlockAccount,
    cancelUnlock
  }
)(
  class UnlockAccountPasswordDialog extends React.PureComponent<UnlockAccountPasswordDialogProps, UnlockAccountPasswordDialogState> {
    state = {
      password: '',
      rendering: null,
    };

    private submitButton: HTMLButtonElement | null = null;
    private passwordInput: Input | null = null;

    componentDidMount(): void {
      if (this.props.unlockingAccount) {
        this.setState({ rendering: this.props.unlockingAccount });
      }
    }

    componentWillReceiveProps(nextProps: Readonly<UnlockAccountPasswordDialogProps>) {
      if (nextProps.unlockingAccount && nextProps.unlockingAccount !== this.props.unlockingAccount) {
        this.setState({ password: '', rendering: nextProps.unlockingAccount });

        if (this.passwordInput) {
          this.passwordInput.focus();
        }
      }
    }

    render() {
      const {
        cancelUnlock,
        unlockAccount,
        unlockingAccount
      } = this.props;

      const { password, rendering } = this.state;

      const showing = unlockingAccount ? unlockingAccount : rendering;

      return (
        <AnimatedModal open={!!unlockingAccount} size="mini">
          <Modal.Header>
            Unlock account: {showing && showing.name}
          </Modal.Header>
          <Modal.Content>
            <Form
              onSubmit={() => unlockingAccount && unlockAccount(unlockingAccount.id, password)}
              compact>
              <Form.Field>
                <label htmlFor="unlock-account-name">Account name</label>
                <Input
                  id="unlock-account-name"
                  type="text"
                  fluid
                  readOnly
                  value={showing && showing.name}
                />
              </Form.Field>

              <Form.Field style={{ marginBottom: 0 }}>
                <label htmlFor="unlock-account-password">Account password</label>
                <Input
                  id="unlock-account-password"
                  type="password"
                  fluid
                  placeholder="Account password"
                  required
                  value={password}
                  ref={passwordInput => this.passwordInput = passwordInput}
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </Form.Field>

              <button type="submit" style={{ visibility: 'hidden' }}
                      ref={submitButton => this.submitButton = submitButton}/>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button type="button" onClick={() => unlockingAccount && cancelUnlock()}>
              Cancel
            </Button>
            <Button
              primary type="button"
              onClick={() => this.submitButton && this.submitButton.click()}>
              <Icon name="key"/> Unlock
            </Button>
          </Modal.Actions>
        </AnimatedModal>
      );
    }
  }
);