Balanced.BankAccount = Balanced.FundingInstrument.extend({
    uri: '/v1/bank_accounts',

    verifications: Balanced.Model.hasMany('Balanced.Verification', 'verifications_uri'),
    verification: Balanced.Model.belongsTo('Balanced.Verification', 'verification_uri'),

    type_name: function () {
        return 'Bank Account';
    }.property(),

    is_bank_account: true,

    description: function () {
        if (this.get('bank_name')) {
            return '{0} ({1})'.format(
                this.get('last_four'),
                Balanced.Utils.toTitleCase(this.get('bank_name'))
            );
        } else {
            return this.get('last_four');
        }
    }.property('last_four', 'bank_name'),

    title_description: function() {
        return '{0} ({1})'.format(
                this.get('name'),
                this.get('last_four')
            );
    }.property('name', 'last_four'),

    description_with_type: function () {
        return 'Bank account: {0}'.format(this.get('description'));
    }.property('description'),

    verified: function () {
        return this.get('can_debit') || this.get('verification.state') === 'verified';
    }.property('verification.state')
});

Balanced.TypeMappings.addTypeMapping('bank_account', 'Balanced.BankAccount');
