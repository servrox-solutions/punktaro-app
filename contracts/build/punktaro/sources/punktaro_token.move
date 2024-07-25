module punktaro::punktaro_token {
    use sui::coin::{Self, TreasuryCap};
    use sui::token::{Self, ActionRequest, Token};
    use sui::{clock::Clock};

    const E_REWARDS_INSUFFICIENT: u64 = 1;

    public struct PUNKTARO_TOKEN has drop {}

    public struct RewardReceiptRule has drop {}

    // Create a reward receipt for the user
    public struct RewardReceipt has key, store {
        id: UID,
        amount: u64,
        timestamp_ms: u64,
        reward_id: u64,
    }

    // public struct RewardConfig has key, store {
    //     id: UID,
    //     min_reward_value: u64,
    // }

    fun init(
        witness: PUNKTARO_TOKEN,
        ctx: &mut TxContext
    ) {
        let (treasury_cap, metadata) = coin::create_currency(
            witness,
            6,
            b"PUNKT",
            b"Punktaro",
            b"Punktaro Bonus Points",
            option::none(),
            ctx
        );

        let (mut policy, policy_cap) = token::new_policy(&treasury_cap, ctx);

        token::add_rule_for_action<PUNKTARO_TOKEN, RewardReceiptRule>(
            &mut policy,
            &policy_cap,
            token::spend_action(),
            ctx
        );

        token::share_policy(policy);

        transfer::public_freeze_object(metadata);
        transfer::public_transfer(treasury_cap, ctx.sender());
        transfer::public_transfer(policy_cap, ctx.sender());

        // Initialize the threshold state
        // let threshold_state = RewardConfig {
        //     id: object::new(ctx),
        //     min_reward_value: 100,
        // };
        // transfer::public_transfer(threshold_state, ctx.sender());
    }

    // public fun set_min_reward_value(
    //     reward_config: &mut RewardConfig,
    //     min_reward_value: u64,
    // ) {
    //     reward_config.min_reward_value = min_reward_value;
    // }


    public fun reward(
        treasury_cap: &mut TreasuryCap<PUNKTARO_TOKEN>,
        amount: u64,
        recipient: address,
        ctx: &mut TxContext,
    ) {
        let token = token::mint(treasury_cap, amount, ctx);
        let req = token::transfer(token, recipient, ctx);
        token::confirm_with_treasury_cap(treasury_cap, req, ctx);
    }


    public fun spend_rewards(
        reward_id: u64, 
        token: Token<PUNKTARO_TOKEN>, 
        clock: &Clock,
        ctx: &mut TxContext
    ): (RewardReceipt, ActionRequest<PUNKTARO_TOKEN>) {
        let token_value = token::value(&token);
        assert!(token_value >= 100, E_REWARDS_INSUFFICIENT);

        let reward_receipt = RewardReceipt {
             id: object::new(ctx),
             amount: token_value,
             timestamp_ms: clock.timestamp_ms(),
             reward_id: reward_id,
        };

        let mut req = token::spend(token, ctx);

        token::add_approval(RewardReceiptRule {}, &mut req, ctx);

        (reward_receipt, req)
    }
}
