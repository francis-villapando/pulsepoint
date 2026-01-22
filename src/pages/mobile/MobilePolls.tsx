import { mockPolls } from '@/data/mockData';
import { PollCard } from '@/components/display/PollCard';

export default function MobilePolls() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-display font-semibold">Community Polls</h2>
      <div className="space-y-4">
        {mockPolls.map((poll) => (
          <PollCard key={poll.id} poll={poll} />
        ))}
      </div>
    </div>
  );
}
