#!/bin/bash

# AI Study Assistant Course - Reset Script
# This script helps students reset their project to different module checkpoints

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  AI Study Assistant - Course Reset${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo -e "${YELLOW}Initializing git repository...${NC}"
    git init
    echo -e "${GREEN}Git repository initialized!${NC}"
    echo ""
    echo -e "${YELLOW}Note: To use module checkpoints, you'll need to set up branches.${NC}"
    echo -e "${YELLOW}For now, you can use stash to save your work.${NC}"
    echo ""
fi

# Show current status
echo "Current status:"
echo -e "${BLUE}───────────────────────────────────────${NC}"
git status --short 2>/dev/null || echo "No changes yet"
echo -e "${BLUE}───────────────────────────────────────${NC}"
echo ""

echo -e "${GREEN}What would you like to do?${NC}"
echo ""
echo "  ${BLUE}1)${NC} Stash current work (save for later)"
echo "  ${BLUE}2)${NC} View saved work (stash list)"
echo "  ${BLUE}3)${NC} Restore saved work (pop stash)"
echo "  ${BLUE}4)${NC} Discard all changes (hard reset)"
echo "  ${BLUE}5)${NC} Create initial commit"
echo "  ${BLUE}6)${NC} Cancel"
echo ""

read -p "Enter your choice (1-6): " choice

case $choice in
    1)
        read -p "Enter a name for this saved work: " stash_name
        git add .
        git stash push -m "$stash_name"
        echo ""
        echo -e "${GREEN}✓ Work saved as: $stash_name${NC}"
        echo -e "${BLUE}Tip: Use option 2 to see all saved work${NC}"
        ;;
    2)
        echo ""
        echo -e "${GREEN}Saved work (stashes):${NC}"
        echo -e "${BLUE}───────────────────────────────────────${NC}"
        if git stash list 2>/dev/null | grep -q .; then
            git stash list
        else
            echo "No saved work found"
        fi
        echo -e "${BLUE}───────────────────────────────────────${NC}"
        ;;
    3)
        echo ""
        git stash list
        echo ""
        read -p "Enter stash index to restore (e.g., 0 for most recent): " stash_index
        git stash apply "stash@{$stash_index}"
        echo ""
        echo -e "${GREEN}✓ Work restored!${NC}"
        echo -e "${YELLOW}Note: The stash is still saved. Use 'git stash drop' to remove it.${NC}"
        ;;
    4)
        echo ""
        echo -e "${RED}⚠️  WARNING: This will discard ALL uncommitted changes!${NC}"
        read -p "Are you sure? (yes/no): " confirm
        if [ "$confirm" = "yes" ]; then
            git reset --hard 2>/dev/null || echo "Nothing to reset"
            git clean -fd
            echo ""
            echo -e "${GREEN}✓ All changes discarded. Project reset to last commit.${NC}"
        else
            echo "Cancelled."
        fi
        ;;
    5)
        echo ""
        echo -e "${YELLOW}Creating initial commit...${NC}"
        git add .
        git commit -m "Initial commit: AI Study Assistant Course Setup

🎓 Course project initialized with:
- Next.js 16.1 + React 19 + TypeScript
- 10 learning modules
- LangGraph integration
- Comprehensive documentation

Ready to start learning!
" || echo "Nothing to commit or already committed"
        echo ""
        echo -e "${GREEN}✓ Initial commit created!${NC}"
        echo -e "${BLUE}Tip: You can now create module branches for checkpoints${NC}"
        ;;
    6)
        echo ""
        echo "Cancelled."
        exit 0
        ;;
    *)
        echo ""
        echo -e "${RED}Invalid choice.${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}Done!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "  - Check current status: ${YELLOW}git status${NC}"
echo "  - Continue learning: ${YELLOW}pnpm dev${NC}"
echo "  - View progress: ${YELLOW}cat course/progress/checklist.md${NC}"
echo ""
