import { mockPolls } from '@/data/mockData';
import { PollCard } from '@/components/display/PollCard';

export default function MobilePolls() {
  const handleVote = (pollId: string, optionId: string) => {
    // Here you would implement the actual voting logic
    // For now, we'll just log the vote
    console.log(`Voting for poll ${pollId}, option ${optionId}`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-display font-semibold">Community Polls</h2>
      <div className="space-y-4">
        {mockPolls.map((poll) => (
          <PollCard
            key={poll.id}
            poll={poll}
            onVote={handleVote}
            isDisplay={false} // Ensure voting is enabled for mobile view
          />
        ))}
      </div>
    </div>
  );
}
