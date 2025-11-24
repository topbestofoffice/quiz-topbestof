# TboBuzz GAM Configuration Guide

## Overview

The TboBuzz GAM (Google Ad Manager) script replaces PubGuru with a direct, configurable GAM integration. All settings are clearly defined in the `TboBuzzGAMConfig` object.

## Quick Start

1. Include the script in your HTML:
```html
<script src="js/tbobuzz-gam-config.js"></script>
```

2. Add ad containers to your HTML:
```html
<div data-slot-name="Tbobuzz_Mobile_Top"></div>
<div data-slot-name="Tbobuzz_Mobile_Leaderboard"></div>
```

3. Customize the configuration in the script or override it:
```javascript
// Override specific settings
window.TboBuzzGAMConfig.enableDebugMode = true;
window.TboBuzzGAMConfig.rewardAmount = 150;
```

## Configuration Options

### Basic Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `networkCode` | string | "22760191030" | Your GAM network code |
| `publisherName` | string | "TboBuzz" | Your website name |  
| `domain` | string | "Chandra Prakash Verma.com" | Your domain name |
| `currency` | string | "USD" | Currency code |

### Performance Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `enableSingleRequest` | boolean | true | Load all ads in one request (faster) |
| `collapseEmptyDivs` | boolean | true | Hide empty ad slots |
| `timeout` | number | 2000 | Ad loading timeout in milliseconds |
| `refreshTimeout` | number | 90 | Time between ad refreshes in seconds |

### Lazy Loading

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `enableLazyLoading` | boolean | true | Enable lazy loading for better performance |
| `lazyLoadMargin` | string | "200px" | Load ads X pixels before they're visible |
| `lazyLoadThreshold` | number | 1.75 | Multiplier for viewport height |

### Anchor Ads (Sticky Ads)

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `enableAnchorAds` | boolean | true | Enable sticky bottom/top ads |
| `anchorPosition` | string | "bottom" | "top" or "bottom" |
| `anchorDelay` | number | 0 | Delay before showing anchor ad (ms) |

### Rewarded Ads

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `enableRewardedAds` | boolean | true | Enable reward video ads |
| `rewardAmount` | number | 100 | Coins/points awarded per ad view |
| `rewardCurrency` | string | "coins" | Currency name for rewards |

### Ad Refresh

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `enableAdRefresh` | boolean | false | Auto-refresh ads for more revenue |
| `refreshMaxCount` | number | 3 | Maximum refreshes per slot |
| `refreshViewabilityThreshold` | number | 0.75 | % of ad visible to refresh |

### Mobile/Responsive

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `enableResponsiveAds` | boolean | true | Use responsive ad sizing |
| `mobileBreakpoint` | number | 768 | Screen width for mobile detection (px) |

### Security & Bot Protection

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `enableBotProtection` | boolean | true | Block bots and suspicious traffic |
| `botDetectionRegex` | RegExp | /bot\|crawler\|spider.../ | Pattern to detect bots |

### Debugging

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `enableDebugMode` | boolean | false | Show console logs (development only) |
| `enableConsoleStats` | boolean | false | Show performance statistics |

## Ad Units Configuration

Each ad unit has the following structure:

```javascript
{
    slotName: "Tbobuzz_Mobile_Top",                    // Unique identifier
    adUnitPath: "/22760191030/j4578325", // GAM ad unit path
    device: "mobile",                                  // "mobile" or "desktop"
    sizes: [[320, 100], [300, 250]],                 // Array of [width, height] arrays
    position: "header",                               // "header", "content", "sidebar", "anchor"
    isLazy: false,                                    // Load when visible (lazy loading)
    isAnchor: false,                                  // Is this a sticky/anchor ad
    targeting: {},                                    // Key-value targeting pairs
    customCss: ""                                     // Custom CSS for this ad slot
}
```

### Available Ad Units

**Desktop:**
- `Tbobuzz_Desk_Leaderboard` - Header banner (728x90, 970x90, etc.)
- `Tbobuzz_Desk_Incontent_Lazy` - Content area (lazy loaded)
- `Tbobuzz_Desktop_Sidebar_ATF` - Sidebar above fold
- `Tbobuzz_Desktop_Sidebar_BTF` - Sidebar below fold (lazy)
- `Tbobuzz_Desktop_Anchor` - Sticky bottom banner

**Mobile:**
- `Tbobuzz_Mobile_Leaderboard` - Header banner
- `Tbobuzz_Mobile_Mob_Incontent_Lazy` - Content area (lazy loaded)
- `Tbobuzz_Mobile_Anchor` - Sticky bottom banner
- `Tbobuzz_Mobile_Top` - Top of page banner

## Callback Functions

Customize the behavior by modifying the callback functions:

### onAdLoaded
Called when an ad successfully loads:
```javascript
onAdLoaded: function(slotName, size) {
    console.log(`Ad loaded: ${slotName} (${size[0]}x${size[1]})`);
    // Your custom code here
}
```

### onAdEmpty
Called when an ad slot is empty:
```javascript
onAdEmpty: function(slotName) {
    console.log(`No ad available for: ${slotName}`);
    // Hide the container or show placeholder
}
```

### onRewardGranted
Called when user completes a rewarded ad:
```javascript
onRewardGranted: function(amount, currency) {
    // Default: adds coins to localStorage
    // Customize this to match your reward system
    const coins = parseInt(localStorage.getItem("totalcoin") || "0") + amount;
    localStorage.setItem("totalcoin", coins.toString());
    
    // Show notification
    alert(`You earned ${amount} ${currency}!`);
}
```

### onRewardFailed
Called when rewarded ad fails:
```javascript
onRewardFailed: function(reason) {
    alert(`Reward ad failed: ${reason}`);
}
```

### onError
Called on any errors:
```javascript
onError: function(error, context) {
    console.error(`Error in ${context}:`, error);
}
```

## HTML Implementation

### Basic Ad Container
```html
<div data-slot-name="Tbobuzz_Mobile_Top"></div>
```

### Ad Container with Custom Styling
```html
<div data-slot-name="Tbobuzz_Mobile_Leaderboard" 
     style="text-align: center; margin: 20px 0;"></div>
```

### Multiple Ad Containers
```html
<!-- Header -->
<div data-slot-name="Tbobuzz_Mobile_Top"></div>

<!-- Content Area -->
<div class="content">
    <p>Your content here...</p>
    <div data-slot-name="Tbobuzz_Mobile_Mob_Incontent_Lazy"></div>
    <p>More content...</p>
</div>

<!-- Anchor ads are automatically created - no container needed -->
```

## Advanced Usage

### Override Configuration
```javascript
// Override settings after script loads
window.TboBuzzGAMConfig.enableDebugMode = true;
window.TboBuzzGAMConfig.rewardAmount = 200;
window.TboBuzzGAMConfig.callbacks.onRewardGranted = function(amount, currency) {
    // Your custom reward logic
    myCustomRewardFunction(amount);
};
```

### Add Custom Ad Units
```javascript
// Add a new ad unit
window.TboBuzzGAMConfig.adUnits.push({
    slotName: "Custom_Header_Ad",
    adUnitPath: "/22760191030/Custom_Header",
    device: "mobile",
    sizes: [[320, 50], [300, 50]],
    position: "header",
    isLazy: false,
    targeting: { section: "home" },
    customCss: "border: 1px solid #ccc;"
});
```

### Manual Ad Control
```javascript
// Refresh specific ad
window.TboBuzzGAMInstance.refreshAd('Tbobuzz_Mobile_Top');

// Refresh all ads
window.TboBuzzGAMInstance.refreshAllAds();

// Add targeting
window.TboBuzzGAMInstance.updateTargeting('Tbobuzz_Mobile_Top', 'category', 'sports');

// Get performance stats
const stats = window.TboBuzzGAMInstance.getPerformanceStats();
console.log(stats);
```

### Show Rewarded Ads
```javascript
// Show rewarded ad (replaces old RewardAd function)
window.RewardAd(); // Still works for backward compatibility

// Or use the new method
window.TboBuzzGAMInstance.showRewardedAd();
```

## Migration from PubGuru

1. **Replace PubGuru script**:
   ```html
   <!-- OLD -->
   <script src="//c.pubguru.net/pg.tbobuzz.js"></script>
   
   <!-- NEW -->
   <script src="js/tbobuzz-gam-config.js"></script>
   ```

2. **Update ad containers**:
   ```html
   <!-- OLD -->
   <pubguru data-pg-ad="Tbobuzz_Mobile_Top"></pubguru>
   
   <!-- NEW -->
   <div data-slot-name="Tbobuzz_Mobile_Top"></div>
   ```

3. **Keep existing functions**:
   - `RewardAd()` still works
   - All slot names remain the same
   - Callbacks work similarly

## Troubleshooting

### Debug Mode
Enable debug mode to see what's happening:
```javascript
window.TboBuzzGAMConfig.enableDebugMode = true;
```

### Check Status
```javascript
// Check if GAM is initialized
console.log(window.checkTboBuzzGAMStatus());

// Check performance stats
window.TboBuzzGAMInstance.getPerformanceStats();
```

### Common Issues

1. **Ads not showing**: Check browser console for errors, ensure ad containers exist
2. **Rewarded ads not working**: Verify `enableRewardedAds: true` in config
3. **Lazy loading not working**: Ensure containers are in viewport, check `lazyLoadMargin`
4. **Anchor ads not showing**: Check `enableAnchorAds: true` and `anchorDelay` settings

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+  
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers
- ❌ Internet Explorer (not supported)

## Performance Tips

1. Enable single request: `enableSingleRequest: true`
2. Use lazy loading: `enableLazyLoading: true`
3. Collapse empty divs: `collapseEmptyDivs: true`
4. Disable debug in production: `enableDebugMode: false`
5. Set appropriate timeout: `timeout: 2000`

## Security

- Bot protection is enabled by default
- All external scripts are loaded securely
- No personal data is collected by default
- Customize bot detection regex as needed

## Support

For issues or questions:
1. Enable debug mode and check console
2. Verify configuration matches your GAM setup
3. Test with different ad units
4. Check network connectivity to Google Ad Manager
