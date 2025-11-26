#!/bin/bash

echo "🧹 Cleaning iOS build..."

# Navigate to iOS directory
cd ios

# Remove Pods and build artifacts
echo "📦 Removing Pods..."
rm -rf Pods
rm -rf Podfile.lock

# Remove build folder
echo "🗑️  Removing build folder..."
rm -rf build

# Remove DerivedData
echo "🗑️  Removing DerivedData..."
rm -rf ~/Library/Developer/Xcode/DerivedData/Lynx-*

# Go back to root
cd ..

# Clean node modules cache
echo "🧹 Cleaning node modules cache..."
rm -rf node_modules/.cache

# Install pods
echo "📦 Installing Pods..."
cd ios
pod deintegrate
pod install

cd ..

echo "✅ iOS build cleaned and pods installed!"
echo ""
echo "Next steps:"
echo "1. Open Xcode: open ios/Lynx.xcworkspace"
echo "2. Clean Build Folder: Product > Clean Build Folder (Cmd+Shift+K)"
echo "3. Build: Product > Build (Cmd+B)"
echo ""
echo "Or run from terminal:"
echo "npx react-native run-ios"

